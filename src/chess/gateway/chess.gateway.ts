import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

import { RoomService } from '@room/domain/service/room.service';
import { ChessGamesStateService } from '@chess/domain/service/chess-games-state.service';
import ItDidNotMoveException from '@chess/domain/exception/ItDidNotMoveException';
import { Position2D } from '@common/interfaces/position2-d.interface';
import Chess from '@chess/domain/class/chess';
import { GameFactoryService } from '@common/service/game-factory.service';
import IWSResponse from '@common/class/IWSResponse';
import ChessGameState from '@chess/domain/dto/ChessGameState';
import Room from '@room/domain/dto/room.dto';

@WebSocketGateway({ namespace: '/game/chess/' })
export class ChessGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  constructor(
    private gameFactory: GameFactoryService,
    private roomService: RoomService,
    private gameStateService: ChessGamesStateService,
  ) {}

  @SubscribeMessage('newGame')
  async handleNewGame(@ConnectedSocket() client: Socket) {
    const response = new IWSResponse();
    let gameState: ChessGameState, room: Room;

    const game = this.gameFactory.getGame('chess');
    game.newGame();
    game.addPlayer(client.id);

    try {
      room = await this.roomService.createRoom(client.id);
      await this.gameStateService.createGameState(game, room.roomId);
      client.join(room.roomId);
    } catch (error) {
      this.logger.error(error);

      response.setOk(false).setData({ error: error });
      return { event: 'error', data: response };
    }

    const data = {
      room: room.roomId,
      playerNumber: 1,
      playerId: client.id,
    };
    response.setOk(true).setData(data);
    return { event: 'newGame', data: response };
  }

  @SubscribeMessage('play')
  async handlePlay(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: Position2D[],
  ) {
    const [from, to] = data;
    const response = new IWSResponse();
    let game: Chess, room: Room;
    console.log(from, to);

    try {
      room = await this.roomService.getRoomByMemberId(client.id);

      game = await this.gameStateService.getGame(room.roomId);

      const itMoved = game.move(from.i, from.j, to.i, to.j);
      if (!itMoved) {
        throw new ItDidNotMoveException();
      }

      await this.gameStateService.updateGameState({
        roomId: room.roomId,
        ...game.getState(),
      });
    } catch (error) {
      this.logger.error('Error::chess->play', error.message);
      response.setOk(false).setData({ error: error });
      return { event: 'error', data: response };
    }

    response.setOk(true).setData({ ...game.getBoardData() });

    this.server.in(room.roomId).emit('gameStateUpdate', response);
  }

  @SubscribeMessage('joinGame')
  async handleJoinGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    const response = new IWSResponse();
    const data = {};
    let room: Room, game: Chess;

    try {
      room = await this.roomService.addOneMemberToRoom(client.id, roomId);

      game = await this.gameStateService.getGame(room.roomId);

      if (game.addPlayer(client.id)) {
        data['playerNumber'] = game.getPlayers().indexOf(client.id) + 1;
      }

      await client.join(room.roomId);
      this.gameStateService.updateGameState({
        roomId: room.roomId,
        ...game.getState(),
      });
    } catch (error) {
      this.logger.error(error);
      response.setOk(false).setData({ error: error });
      return { event: 'error', data: response };
    }

    data['room'] = room.roomId;
    data['playerId'] = client.id;

    response.setOk(true).setData(data);
    return { event: 'newGame', data: response };
  }

  afterInit(server: Server) {
    this.logger.log('Ches Gateway Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected to ChessGateway: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected to ChessGateway: ${client.id}`);
  }
}

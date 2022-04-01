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
import { Logger, UseGuards } from '@nestjs/common';

import { RoomService } from '@room/domain/service/room.service';
import { ChessGamesStateService } from '@chess/domain/service/chess-games-state.service';
import ItDidNotMoveException from '@chess/domain/exception/ItDidNotMoveException';
import { Position2D } from '@common/interfaces/position2-d.interface';
import Chess from '@chess/domain/class/chess';
import IWSResponse from '@common/class/IWSResponse';
import Room from '@room/domain/dto/room.dto';
import { JwtPlayerGuard } from '@chess/domain/guards/JwtPlayerGuard';
import { AuthService } from '@auth/domain/services/auth/auth.service';

@WebSocketGateway({ namespace: '/game/chess/' })
export class ChessGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  constructor(
    private gameStateService: ChessGamesStateService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtPlayerGuard)
  @SubscribeMessage('play')
  async handlePlay(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: Position2D[],
  ) {
    const [from, to] = data;
    const response = new IWSResponse();
    let game: Chess, room: Room;
    const { player, role, roomId } =
      this.authService.extractTokenFromSocketClient(client);
    console.log(roomId);

    try {
      game = await this.gameStateService.getGame(roomId);

      const itMoved = game.move(from.i, from.j, to.i, to.j);
      if (!itMoved) {
        throw new ItDidNotMoveException();
      }

      await this.gameStateService.updateGameState({
        roomId: roomId,
        ...game.getState(),
      });
    } catch (error) {
      this.logger.error('Error::chess->play', error.message);
      response.setOk(false).setData({ error: error });
      return { event: 'error', data: response };
    }

    response.setOk(true).setData({ ...game.getBoardData() });

    return this.server.to(roomId).emit('gameStateUpdate', response);
  }

  @SubscribeMessage('joinGame')
  async handleJoinGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    client.join(room);
    this.logger.log(`Client ${client.id} join room ${room}`);
  }

  @SubscribeMessage('prueba')
  async prueba(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    console.log('prueba servidor ', roomId);

    this.server.to(roomId).emit('gameStateUpdate', 'cualquiercosa');
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

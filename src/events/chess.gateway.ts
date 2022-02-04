import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameFactoryService } from '../games/services/game-factory/game-factory.service';
import { RoomService } from '../utils/room/room.service';
import IResponse from './classes/IWSResponse';
import { Logger } from '@nestjs/common';
import { ChessGamesStateService } from 'src/games/services/chess-games-state/chess-games-state.service';

@WebSocketGateway()
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
  handleMessage(client: Socket): WsResponse<any> {
    const response = new IResponse();
    const roomName = '1';
    this.roomService.setRoom(client.id, roomName);
    client.emit('gameCode', roomName);
    const game = this.gameFactory.getGame('chess');
    game.newGame();
    try {
      client.join(roomName);
      this.gameStateService.createGameState(roomName, game);
    } catch (error) {
      this.logger.error(error);
      response.setOk(false).setData({ error: error });
      return { event: 'error', data: response.toJson() };
    }
    // client.number = 1
    const data = {
      room: roomName,
    };
    response.setOk(true).setData(data);
    return { event: 'newGame', data: response.toJson() };
  }

  afterInit(server: Server) {
    this.logger.log('Ches Gateway Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}

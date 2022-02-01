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
import { Logger } from '@nestjs/common';
import { GameFactoryService } from '../games/services/game-factory/game-factory.service';
import { RoomService } from '../utils/room/room.service';
import { GamesStateService } from '../games/services/games-state/games-state.service';
import IResponse from '../core/IResponse';
import Chess from 'src/games/chess/chess';

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
    private gameStateService: GamesStateService,
  ) {}

  @SubscribeMessage('newGame')
  handleMessage(client: Socket): WsResponse<any> {
    const roomName = '1';
    this.roomService.setRoom(client.id, roomName);
    client.emit('gameCode', roomName);
    const game = this.gameFactory.getGame('chess');
    game.newGame();
    this.gameStateService.setGameState(roomName, game);
    client.join(roomName);
    // client.number = 1
    const data = {
      room: roomName,
    };
    const response = new IResponse().setOk(true).setData(data);
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

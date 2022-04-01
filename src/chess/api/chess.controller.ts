import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';

import { ChessGamesStateService } from '@chess/domain/service/chess-games-state.service';
import { HttpExceptionFilter } from '@common/filters/HttpExceptionFilter';
import { GameFactoryService } from '@common/service/game-factory.service';
import { RoomService } from '@room/domain/service/room.service';
import { AuthService } from '@auth/domain/services/auth/auth.service';

@Controller('chess')
@UseFilters(new HttpExceptionFilter())
export class ChessController {
  private logger: Logger = new Logger('AppGateway');

  constructor(
    private chessStateService: ChessGamesStateService,
    private gameFactory: GameFactoryService,
    private roomService: RoomService,
    private gameStateService: ChessGamesStateService,
    private authService: AuthService,
  ) {}

  @Get('state')
  @HttpCode(HttpStatus.OK)
  async getState(@Query('room') room: string) {
    const game = await this.chessStateService.getGame(room);

    return game.getBoardData();
  }

  @Post('newGame')
  @HttpCode(HttpStatus.CREATED)
  async createNewGame() {
    const game = this.gameFactory.getGame('chess');

    game.newGame();
    game.addPlayer('1');

    const room = await this.roomService.createEmptyRoom();
    await this.gameStateService.createGameState(game, room);

    let data = {
      role: 'player',
      room: room.roomId,
      player: 1,
    };
    data = this.authService.generatePlayerJWT(data);

    return data;
  }

  @Post('joinGame')
  @HttpCode(HttpStatus.OK)
  async joinGame(@Query('room') roomId: string) {
    let data = {};

    const game = await this.gameStateService.getGame(roomId);
    data['room'] = roomId;

    if (game.addPlayer('2')) {
      this.gameStateService.updateGameState({
        roomId: roomId,
        ...game.getState(),
      });
      data['role'] = 'player';
      data['player'] = 2;
      data = this.authService.generatePlayerJWT(data);
    } else data['role'] = 'spectator';

    return data;
  }
}

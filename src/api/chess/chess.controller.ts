import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Query,
  UseFilters,
} from '@nestjs/common';

import { ChessGamesStateService } from '@games/services/chess-games-state/chess-games-state.service';
import ResponseTemplate from '@api/classes/ResponseTemplate';
import { HttpExceptionFilter } from '@api/filters/HttpExceptionFilter';

@Controller('chess')
export class ChessController {
  private logger: Logger = new Logger('AppGateway');

  constructor(private chessStateService: ChessGamesStateService) {}

  @Get('state')
  @HttpCode(HttpStatus.OK)
  @UseFilters(new HttpExceptionFilter())
  async getState(@Query('room') room: string) {
    const response = new ResponseTemplate();
    response.setEntry({ room });
    const game = await this.chessStateService.getGame(room);
    if (game) {
      response.setData(game.getBoardData());
    }
    return response.getResponseObj();
  }
}

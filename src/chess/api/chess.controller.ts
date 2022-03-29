import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Query,
  UseFilters,
} from '@nestjs/common';

import { ChessGamesStateService } from '@chess/domain/service/chess-games-state.service';
import ResponseTemplate from '@common/class/ResponseTemplate';
import { HttpExceptionFilter } from '@common/filters/HttpExceptionFilter';

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

import { Controller, Get, Logger, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChessGamesStateService } from 'src/games/services/chess-games-state/chess-games-state.service';
import IResponseData from '../classes/IResponseData';

@Controller('chess')
export class ChessController {
  private logger: Logger = new Logger('AppGateway');

  constructor(private chessStateService: ChessGamesStateService) {}

  @Get('state')
  async getState(@Query() query: any, @Res() res: Response) {

    const resData = new IResponseData();
    resData.setEntry(query);
    const { room } = query;
    try {
      const game = await this.chessStateService.getGame(room);
      if (game) {
        this.logger.debug(game.getBoardData());
        resData.setStatus(200).setData({
          turn: game.getTurn(),
          board: game.getBoardData(),
        });
      }
    } catch (error: any) {
      this.logger.error(error.stack);
      resData.setData(error).setStatus(404);
      return res.status(resData.getStatus()).json(resData).send();
    }
    res.status(200).json(resData).send();
  }
}

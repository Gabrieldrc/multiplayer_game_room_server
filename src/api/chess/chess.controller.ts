import { Controller, Get, Logger, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChessGamesStateService } from 'src/games/services/chess-games-state/chess-games-state.service';
import IResponseData from '../classes/IResponseData';

@Controller('chess')
export class ChessController {
  private logger: Logger = new Logger('AppGateway');

  constructor(private chessStateService: ChessGamesStateService) {}

  @Get('state')
  getState(@Query() query: any, @Res() res: Response) {
    const resData = new IResponseData();
    const { room } = query;
    try {
      const game = this.chessStateService.getGame(room);
      if (game) {
        resData.setStatus(200).setData({
          turn: game.getTurn(),
          board: game.getBoardData(),
        });
      }
    } catch (error) {
      res
        .status(400)
        .json({ entry: query, response: { status: 400, error: error } })
        .send();
    }

    res.status(200).json(resData).send();
  }
}

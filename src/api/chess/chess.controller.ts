import { Controller, Get, Logger, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('chess')
export class ChessController {
  private logger: Logger = new Logger('AppGateway');

  @Get('state')
  get(@Req() req: Request, @Res() res: Response) {
    
    res
      .status(200)
      .json({
        entry: req.params,
        response: { status: 200, room: req.params['room'] },
      })
      .send();
  }
}

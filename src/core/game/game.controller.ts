import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class GameController {
  @Post(':name')
  create(@Param('name') gameName, @Req() req: Request, @Res() res: Response) {
    res
      .status(201)
      .json({
        entry: req.params,
        response: { status: 201, game_name: gameName, room: 'aoeirngoiaew1' },
      })
      .send();
  }
}

import { Module } from '@nestjs/common';

import { GamesModule } from '@games/games.module';
import { ChessController } from '@api/chess/chess.controller';

@Module({
  controllers: [ChessController],
  imports: [GamesModule],
})
export class ApiModule {}

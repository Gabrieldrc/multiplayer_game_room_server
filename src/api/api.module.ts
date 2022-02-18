import { Module } from '@nestjs/common';
import { GamesModule } from 'src/games/games.module';
import { ChessController } from './chess/chess.controller';

@Module({
  controllers: [ChessController],
  imports: [GamesModule],
})
export class ApiModule {}

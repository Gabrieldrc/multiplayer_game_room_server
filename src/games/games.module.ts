import { Module } from '@nestjs/common';
import { ChessModule } from './chess/chess.module';
import { GameFactoryService } from './game-factory/game-factory.service';

@Module({
  imports: [ChessModule],
  providers: [GameFactoryService],
  exports: [GameFactoryService],
})
export class GamesModule {}

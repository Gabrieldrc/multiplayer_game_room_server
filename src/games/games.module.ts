import { Module } from '@nestjs/common';
import { ChessModule } from './chess/chess.module';
import { GameFactoryService } from './services/game-factory/game-factory.service';
import { GamesStateService } from './services/games-state/games-state.service';

@Module({
  imports: [ChessModule],
  providers: [GameFactoryService, GamesStateService],
  exports: [GameFactoryService, GamesStateService],
})
export class GamesModule {}

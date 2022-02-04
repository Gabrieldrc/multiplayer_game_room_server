import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChessModule } from './chess/chess.module';
import {
  ChessGameState,
  ChessGameStateSchema,
} from './chess/schemas/chess-game-state.schema';
import { GameFactoryService } from './services/game-factory/game-factory.service';
import { ChessGamesStateRepository } from './repositories/chess-games-state-repository/chess-games-state-repository.service';
import { ChessGamesStateService } from './services/chess-games-state/chess-games-state.service';

@Module({
  imports: [
    ChessModule,
    MongooseModule.forFeature([
      { name: ChessGameState.name, schema: ChessGameStateSchema },
    ]),
  ],
  providers: [
    GameFactoryService,
    ChessGamesStateRepository,
    ChessGamesStateService,
  ],
  exports: [
    GameFactoryService,
    ChessGamesStateRepository,
    ChessGamesStateService,
  ],
})
export class GamesModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChessModule } from './chess/chess.module';
import {
  ChessGameState,
  ChessGameStateSchema,
} from './chess/schemas/chess-game-state.schema';
import { GameFactoryService } from './services/game-factory/game-factory.service';
import { ChessGamesStateService } from './services/games-state/chess-games-state.service';

@Module({
  imports: [
    ChessModule,
    MongooseModule.forFeature([
      { name: ChessGameState.name, schema: ChessGameStateSchema },
    ]),
  ],
  providers: [GameFactoryService, ChessGamesStateService],
  exports: [GameFactoryService, ChessGamesStateService],
})
export class GamesModule {}

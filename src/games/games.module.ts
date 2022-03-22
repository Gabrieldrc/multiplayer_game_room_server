import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChessModule } from '@games/chess/chess.module';
import {
  ChessGameStateEntity,
  ChessGameStateSchema,
} from '@games/chess/schemas/chess-game-state.schema';
import { GameFactoryService } from '@games/services/game-factory/game-factory.service';
import { ChessGamesStateRepository } from '@games/repositories/chess-games-state-repository/chess-games-state-repository.service';
import { ChessGamesStateService } from '@games/services/chess-games-state/chess-games-state.service';

@Module({
  imports: [
    ChessModule,
    MongooseModule.forFeature([
      { name: ChessGameStateEntity.name, schema: ChessGameStateSchema },
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

import { CommonModule } from '@common/common.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModule } from '@room/room.module';

import { ChessController } from './api/chess.controller';
import { ChessGamesStateService } from './domain/service/chess-games-state.service';
import { PieceFactoryService } from './domain/service/piece-factory.service';
import { ChessGateway } from './gateway/chess.gateway';
import { ChessGamesStateRepository } from './persistence/repository/chess-games-state-repository.service';
import {
  ChessGameStateEntity,
  ChessGameStateSchema,
} from './persistence/schemas/chess-game-state.schema';

@Module({
  providers: [
    ChessGateway,
    PieceFactoryService,
    ChessGamesStateService,
    ChessGamesStateRepository,
  ],
  controllers: [ChessController],
  imports: [
    RoomModule,
    forwardRef(() => CommonModule),
    MongooseModule.forFeature([
      { name: ChessGameStateEntity.name, schema: ChessGameStateSchema },
    ]),
  ],
  exports: [PieceFactoryService],
})
export class ChessModule {}

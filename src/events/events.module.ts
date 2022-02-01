import { Module } from '@nestjs/common';
import { ChessGateway } from './chess.gateway';
import { GamesModule } from '../games/games.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  providers: [ChessGateway],
  imports: [GamesModule, UtilsModule],
})
export class EventsModule {}

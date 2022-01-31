import { Module } from '@nestjs/common';
import { ChessGateway } from './chess.gateway';
import { GamesModule } from '../games/games.module';

@Module({
  providers: [ChessGateway],
  imports: [GamesModule],
})
export class EventsModule {}

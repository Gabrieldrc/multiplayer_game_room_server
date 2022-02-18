import { Module } from '@nestjs/common';
import { ChessModule } from 'src/games/chess/chess.module';
import { GamesModule } from 'src/games/games.module';
import { UtilsModule } from 'src/utils/utils.module';
import { ChessGateway } from './chess.gateway';

@Module({
  providers: [ChessGateway],
  imports: [UtilsModule, GamesModule, ChessModule],
})
export class EventsModule {}

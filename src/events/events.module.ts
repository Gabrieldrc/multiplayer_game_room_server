import { Module } from '@nestjs/common';
import { ChessModule } from '@games/chess/chess.module';
import { GamesModule } from '@games/games.module';
import { UtilsModule } from '@utils/utils.module';
import { ChessGateway } from './chess.gateway';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [ChessGateway, ChatGateway],
  imports: [UtilsModule, GamesModule, ChessModule],
})
export class EventsModule {}

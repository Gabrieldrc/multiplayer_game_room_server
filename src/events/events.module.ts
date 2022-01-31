import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { GamesModule } from '../games/games.module';

@Module({
  providers: [AppGateway],
  imports: [GamesModule],
})
export class EventsModule {}

import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { GamesModule } from './games/games.module';
import { UtilsModule } from './utils/utils.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [EventsModule, GamesModule, UtilsModule, CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { GamesModule } from './games/games.module';
import { UtilsModule } from './utils/utils.module';
import { ApiModule } from './api/api.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env' }),
    MongooseModule.forRoot('mongodb://root:example@127.0.0.1:27017/admin'),
    EventsModule,
    GamesModule,
    UtilsModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

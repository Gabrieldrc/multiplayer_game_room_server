import { Module } from '@nestjs/common';
import config from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';

import { EventsModule } from '@events/events.module';
import { GamesModule } from '@games/games.module';
import { UtilsModule } from '@utils/utils.module';
import { ApiModule } from '@api/api.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from 'src/enviroments';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_DB: Joi.string().required(),
        MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
        MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
        MONGO_CONNECTION: Joi.string().required(),
      }),
    }),
    EventsModule,
    GamesModule,
    UtilsModule,
    ApiModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

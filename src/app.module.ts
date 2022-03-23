import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { enviroments } from '@config/enviroments';
import config from '@config/config';
import { DatabaseModule } from './database/database.module';
import { ChessModule } from '@chess/chess.module';
import { ChatModule } from '@chat/chat.module';
import { CommonModule } from '@common/common.module';
import { RoomModule } from '@room/room.module';

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
    DatabaseModule,
    ChessModule,
    ChatModule,
    CommonModule,
    RoomModule,
  ],
})
export class AppModule {}

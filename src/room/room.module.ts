import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomService } from './domain/service/room.service';
import { RoomRepository } from './persistence/repository/room-repository.service';
import { RoomEntity, RoomSchema } from './persistence/schemas/room.schema';

@Module({
  providers: [RoomService, RoomRepository],
  exports: [RoomService],
  imports: [
    MongooseModule.forFeature([{ name: RoomEntity.name, schema: RoomSchema }]),
  ],
})
export class RoomModule {}

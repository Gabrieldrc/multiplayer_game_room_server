import { Module } from '@nestjs/common';

import { RoomService } from './domain/service/room.service';
import { RoomRepository } from './persistence/repository/room-repository.service';

@Module({
  providers: [RoomService, RoomRepository],
  exports: [RoomService],
})
export class RoomModule {}

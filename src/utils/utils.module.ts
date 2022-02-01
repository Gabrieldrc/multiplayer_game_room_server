import { Module } from '@nestjs/common';
import { RoomService } from './room/room.service';

@Module({
  providers: [RoomService],
  exports: [RoomService],
})
export class UtilsModule {}

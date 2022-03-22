import { Module } from '@nestjs/common';

import { RoomService } from '@utils/room/room.service';

@Module({
  providers: [RoomService],
  exports: [RoomService],
})
export class UtilsModule {}

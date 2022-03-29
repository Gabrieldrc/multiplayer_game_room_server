import { RoomRepository } from '@room/persistence/repository/room-repository.service';
import { Injectable } from '@nestjs/common';
import Room from '../dto/room.dto';
import NotFoundRoomException from '../exception/NotFoundRoomException';

@Injectable()
export class RoomService {
  private rooms: Map<string, string>;

  constructor(private roomRepository: RoomRepository) {
    this.rooms = new Map<string, string>();
  }

  async createRoom(member: string): Promise<Room> {
    return await this.roomRepository.createRoom({ members: [member] });
  }
  async getRoomByMemberId(memberId: string): Promise<Room> {
    const room = await this.roomRepository.findRoomByMemberId(memberId);
    if (!room) throw new NotFoundRoomException();

    return room;
  }

  async getRoom(roomId: string): Promise<Room> {
    const room = await this.roomRepository.findRoom(roomId);
    if (!room) throw new NotFoundRoomException();

    return room;
  }

  async addOneMemberToRoom(member: string, roomId: string): Promise<Room> {
    const room = await this.getRoom(roomId);
    room.members = room.members.concat([member]);
    return await this.roomRepository.updateRoom(room);
  }
}

import { RoomRepository } from 'src/room/persistence/repository/room-repository.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
  private rooms: Map<string, string>;

  constructor(private roomRepository: RoomRepository) {
    this.rooms = new Map<string, string>();
  }

  getRooms(): Map<string, string> {
    return this.rooms;
  }

  setRooms(value: Map<string, string>) {
    this.rooms = value;
  }

  setRoom(socketId: string, room: string) {
    this.getRooms().set(socketId, room);
  }

  getRoom(socketId: string): string {
    if (this.getRooms().has(socketId)) {
      return this.getRooms().get(socketId) + '';
    }
    return '';
  }
}

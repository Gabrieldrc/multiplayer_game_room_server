import MongoServerError from '@common/exception/MongoServerError';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Room from '@room/domain/dto/room.dto';
import { Model } from 'mongoose';
import { RoomDocument, RoomEntity } from '../schemas/room.schema';

@Injectable()
export class RoomRepository {
  constructor(
    @InjectModel(RoomEntity.name)
    private roomModel: Model<RoomEntity>,
  ) {}

  async createRoom(room: Room): Promise<Room> {
    let document = this.objectToDocument(room);
    try {
      document = await document.save();
    } catch (error) {
      throw new MongoServerError(error.message);
    }

    return this.documentToObject(document);
  }

  async findRoomByMemberId(memberId: string): Promise<Room | null> {
    const document = await this.roomModel
      .findOne()
      .where('members')
      .all([memberId]);
    if (!document) {
      return null;
    }

    return this.documentToObject(document);
  }

  async findRoom(roomId: string): Promise<Room | null> {
    const document = await this.findRoomDocument(roomId);
    if (!document) {
      return null;
    }

    return this.documentToObject(document);
  }

  async updateRoom(room: Room) {
    let document = null;

    document = await this.findRoomDocument(room.roomId);

    if (!document) return document;

    document = await this.updateGameState(room, document);
    return this.documentToObject(document);
  }

  private async findRoomDocument(roomId: string): Promise<RoomDocument | null> {
    let room: RoomDocument = null;
    try {
      room = await this.roomModel.findById(roomId);
    } catch (error) {
      throw new MongoServerError(error.message);
    }
    console.log(room);

    return room;
  }

  private async updateGameState(room: Room, document: RoomDocument) {
    document.members = room.members.concat([]);
    try {
      document = await document.save();
    } catch (error) {
      throw new MongoServerError(error.message);
    }

    return document;
  }

  private objectToDocument(room: Room): RoomDocument {
    return new this.roomModel({
      members: room.members,
    });
  }

  private documentToObject(document: RoomDocument): Room {
    return {
      members: document.members,
      roomId: document._id,
    };
  }
}

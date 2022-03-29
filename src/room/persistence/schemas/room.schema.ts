import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = RoomEntity & Document;

@Schema({})
export class RoomEntity {
  @Prop({ required: true })
  members: string[];

  //14400s == 4h
  @Prop({ type: Date, expires: '14400s', default: () => Date.now() })
  createdAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(RoomEntity);

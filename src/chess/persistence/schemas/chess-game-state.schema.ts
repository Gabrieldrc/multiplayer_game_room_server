import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { PieceModel } from '@chess/domain/interface/PieceModel';

export type ChessGameStateDocument = ChessGameStateEntity & Document;

@Schema()
export class ChessGameStateEntity {
  @Prop({ required: true })
  players: string[];

  @Prop({ require: true })
  turn: number;

  @Prop({ require: true })
  board: PieceModel[][];

  @Prop({ required: true })
  roomId: string;

  //14400s == 4h
  @Prop({ type: Date, expires: '14400s', default: () => Date.now() })
  createdAt: Date;
}

export const ChessGameStateSchema =
  SchemaFactory.createForClass(ChessGameStateEntity);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { PieceModel } from '@games/chess/interfaces/PieceModel';

export type ChessGameStateDocument = ChessGameStateEntity & Document;

@Schema()
export class ChessGameStateEntity {
  @Prop({ required: true })
  players: string[];

  @Prop({ require: true })
  turn: number;

  @Prop({ require: true })
  board: PieceModel[][];
}

export const ChessGameStateSchema =
  SchemaFactory.createForClass(ChessGameStateEntity);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PieceModel } from 'src/games/chess/interfaces/PieceModel';

export type ChessGameStateDocument = ChessGameState & Document;

@Schema()
export class ChessGameState {
  @Prop({ require: true, unique: true })
  roomId: string;

  @Prop({ require: true })
  turn: number;

  @Prop({ require: true })
  board: PieceModel[][];
}

export const ChessGameStateSchema =
  SchemaFactory.createForClass(ChessGameState);

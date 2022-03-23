import { Position2D } from '@common/interfaces/position2-d.interface';

export interface PieceModel {
  name: string;
  player: number;
  position: Position2D;
}

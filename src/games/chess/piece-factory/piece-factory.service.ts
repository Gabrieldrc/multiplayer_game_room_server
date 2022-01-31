import { Injectable } from '@nestjs/common';
import EmptySpaceChess from '../pieces/empty-space';
import Rook from '../pieces/rook';
import Pawn from '../pieces/pawn';
import King from '../pieces/king';
import Queen from '../pieces/queen';
import Knight from '../pieces/knight';
import Bishop from '../pieces/bishop';

@Injectable()
export class PieceFactoryService {
  getPiece(
    name: string = '',
    player: number = 0,
    x: number = -1,
    y: number = -1,
  ) {
    switch (name) {
      case 'ROOK':
        return new Rook(player, x, y);
      case 'PAWN':
        return new Pawn(player, x, y);
      case 'KING':
        return new King(player, x, y);
      case 'QUEEN':
        return new Queen(player, x, y);
      case 'KNIGHT':
        return new Knight(player, x, y);
      case 'BISHOP':
        return new Bishop(player, x, y);
      default:
        return new EmptySpaceChess();
    }
  }
}

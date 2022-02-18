import { Injectable } from '@nestjs/common';
import EmptySpaceChess from '../../classes/pieces/empty-space';
import Rook from '../../classes/pieces/rook';
import Pawn from '../../classes/pieces/pawn';
import King from '../../classes/pieces/king';
import Queen from '../../classes/pieces/queen';
import Knight from '../../classes/pieces/knight';
import Bishop from '../../classes/pieces/bishop';

@Injectable()
export class PieceFactoryService {
  getPiece(
    name: string = '',
    player: number = 0,
    x: number = -1,
    y: number = -1,
  ) {
    name = name.toUpperCase();
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

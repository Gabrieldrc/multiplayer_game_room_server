import { Injectable } from '@nestjs/common';
import EmptySpaceChess from '@games/chess/classes/pieces/empty-space';
import Rook from '@games/chess/classes/pieces/rook';
import Pawn from '@games/chess/classes/pieces/pawn';
import King from '@games/chess/classes/pieces/king';
import Queen from '@games/chess/classes/pieces/queen';
import Knight from '@games/chess/classes/pieces/knight';
import Bishop from '@games/chess/classes/pieces/bishop';

@Injectable()
export class PieceFactoryService {
  getPiece(name = '', player = 0, x = -1, y = -1) {
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

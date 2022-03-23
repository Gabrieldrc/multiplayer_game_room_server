import { Injectable } from '@nestjs/common';

import EmptySpaceChess from '@chess/domain/class/piece/empty-space';
import Rook from '@chess/domain/class/piece/rook';
import Pawn from '@chess/domain/class/piece/pawn';
import King from '@chess/domain/class/piece/king';
import Queen from '@chess/domain/class/piece/queen';
import Knight from '@chess/domain/class/piece/knight';
import Bishop from '@chess/domain/class/piece/bishop';

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

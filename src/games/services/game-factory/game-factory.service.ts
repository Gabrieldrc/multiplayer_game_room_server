import { Injectable } from '@nestjs/common';

import Chess from '@games/chess/chess';
import { PieceFactoryService } from '@games/chess/factories/piece-factory/piece-factory.service';

@Injectable()
export class GameFactoryService {
  constructor(private pieceFactory: PieceFactoryService) {}
  getGame(name: string) {
    name = name.toUpperCase();
    switch (name) {
      case 'CHESS':
        return new Chess(this.pieceFactory);
    }
    return;
  }
}

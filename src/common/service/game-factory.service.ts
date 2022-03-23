import { Injectable } from '@nestjs/common';

import { PieceFactoryService } from '@chess/domain/service/piece-factory.service';
import Chess from '@chess/domain/class/chess';

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

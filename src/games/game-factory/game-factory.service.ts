import { Injectable } from '@nestjs/common';
import Chess from '../chess/chess';
import { PieceFactoryService } from '../chess/piece-factory/piece-factory.service';

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

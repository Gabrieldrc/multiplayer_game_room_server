import { Module } from '@nestjs/common';
import { PieceFactoryService } from '@games/chess/factories/piece-factory/piece-factory.service';

@Module({
  providers: [PieceFactoryService],
  exports: [PieceFactoryService],
})
export class ChessModule {}

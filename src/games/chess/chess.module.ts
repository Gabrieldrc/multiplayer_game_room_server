import { Module } from '@nestjs/common';
import { PieceFactoryService } from './factories/piece-factory/piece-factory.service';

@Module({
  providers: [PieceFactoryService],
  exports: [PieceFactoryService],
})
export class ChessModule {}

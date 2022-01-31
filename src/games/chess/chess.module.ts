import { Module } from '@nestjs/common';
import { PieceFactoryService } from './piece-factory/piece-factory.service';

@Module({
  providers: [PieceFactoryService],
  exports: [PieceFactoryService],
})
export class ChessModule {}

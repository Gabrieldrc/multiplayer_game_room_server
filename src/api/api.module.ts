import { Module } from '@nestjs/common';
import { ChessController } from './chess/chess.controller';

@Module({
  controllers: [ChessController],
})
export class ApiModule {}

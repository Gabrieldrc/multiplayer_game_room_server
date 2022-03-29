import { ChessModule } from '@chess/chess.module';
import { forwardRef, Module } from '@nestjs/common';
import { GameFactoryService } from './service/game-factory.service';

@Module({
  providers: [GameFactoryService],
  imports: [forwardRef(() => ChessModule)],
  exports: [GameFactoryService],
})
export class CommonModule {}

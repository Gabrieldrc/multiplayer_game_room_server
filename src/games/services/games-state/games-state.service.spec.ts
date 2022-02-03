import { Test, TestingModule } from '@nestjs/testing';
import { ChessGamesStateService } from './chess-games-state.service';

describe('ChessGamesStateService', () => {
  let service: ChessGamesStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChessGamesStateService],
    }).compile();

    service = module.get<ChessGamesStateService>(ChessGamesStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { GamesStateService } from './games-state.service';

describe('GamesStateService', () => {
  let service: GamesStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamesStateService],
    }).compile();

    service = module.get<GamesStateService>(GamesStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

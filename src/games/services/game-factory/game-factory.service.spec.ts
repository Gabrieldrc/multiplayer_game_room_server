import { Test, TestingModule } from '@nestjs/testing';
import { GameFactoryService } from './game-factory.service';

describe('GameFactoryService', () => {
  let service: GameFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameFactoryService],
    }).compile();

    service = module.get<GameFactoryService>(GameFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

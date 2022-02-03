import { Test, TestingModule } from '@nestjs/testing';
import { PieceFactoryService } from './piece-factory.service';

describe('PieceFactoryService', () => {
  let service: PieceFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PieceFactoryService],
    }).compile();

    service = module.get<PieceFactoryService>(PieceFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

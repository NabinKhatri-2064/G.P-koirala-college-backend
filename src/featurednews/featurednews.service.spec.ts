import { Test, TestingModule } from '@nestjs/testing';
import { FeaturednewsService } from './featurednews.service.js';

describe('FeaturednewsService', () => {
  let service: FeaturednewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeaturednewsService],
    }).compile();

    service = module.get<FeaturednewsService>(FeaturednewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

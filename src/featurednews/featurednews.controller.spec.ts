import { Test, TestingModule } from '@nestjs/testing';
import { FeaturednewsController } from './featurednews.controller.js';

describe('FeaturednewsController', () => {
  let controller: FeaturednewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeaturednewsController],
    }).compile();

    controller = module.get<FeaturednewsController>(FeaturednewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

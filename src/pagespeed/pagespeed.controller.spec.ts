import { Test, TestingModule } from '@nestjs/testing';
import { PagespeedController } from './pagespeed.controller';
import { PagespeedService } from './pagespeed.service';

describe('PagespeedController', () => {
  let controller: PagespeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagespeedController],
      providers: [PagespeedService],
    }).compile();

    controller = module.get<PagespeedController>(PagespeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

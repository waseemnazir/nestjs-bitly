import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortnerController } from './url-shortner.controller';
import { UrlShortnerService } from '../services/url-shortner.service';

describe('UrlShortnerController', () => {
  let controller: UrlShortnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlShortnerController],
      providers: [UrlShortnerService],
    }).compile();

    controller = module.get<UrlShortnerController>(UrlShortnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

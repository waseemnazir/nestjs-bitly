import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortnerService } from './url-shortner.service';

describe('UrlShortnerService', () => {
  let service: UrlShortnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlShortnerService],
    }).compile();

    service = module.get<UrlShortnerService>(UrlShortnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

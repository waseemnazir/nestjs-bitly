import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { validateUrl } from 'src/utils/validate-url';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from 'src/url-shortner/entities/url-shortner.entity';
import { CreateUrlShortnerDto } from '../dto/create-url-shortner.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UrlShortnerService {
  private readonly logger = new Logger(UrlShortnerService.name);
  private baseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Url)
    private readonly urlRepo: Repository<Url>,
  ) {
    this.baseUrl = this.configService.get('app.baseUrl');
  }

  async generateShortUrl(createUrlDto: CreateUrlShortnerDto) {
    const { originUrl } = createUrlDto;
    const isExistingUrl = await this.urlRepo.findOne({
      where: { originUrl: `${originUrl}` },
    });

    if (isExistingUrl) {
      return isExistingUrl;
    }

    const isValidUrl = validateUrl(originUrl);
    this.logger.debug('isValidUrl', isValidUrl);

    if (!isValidUrl) {
      throw new HttpException(
        {
          data: null,
          status: HttpStatus.BAD_REQUEST,
          message: 'invalid origin url',
          error: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const url = new Url();
    const currentEpochTime = Math.floor(new Date().getTime() / 1000);
    url.originUrl = originUrl;
    url.shortUrl = `${this.baseUrl}${uuid()}`;
    url.createdAt = currentEpochTime;
    url.updatedAt = currentEpochTime;

    const data = await this.urlRepo.save(url);
    return data;
  }
}

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { validateUrl } from 'src/utils/validate-url';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from 'src/url-shortner/entities/url-shortner.entity';
import { CreateUrlShortnerDto } from '../dto/create-url-shortner.dto';
import { BitlyClient } from 'bitly';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlShortnerService {
  private readonly logger = new Logger(UrlShortnerService.name);
  private baseUrl: string;
  private bitly: BitlyClient;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Url)
    private readonly urlRepo: Repository<Url>,
  ) {
    this.baseUrl = this.configService.get<string>('app.baseUrl');
    this.bitly = new BitlyClient(this.configService.get<string>('bitly.token'));
  }

  async generateShortUrl(createUrlDto: CreateUrlShortnerDto): Promise<Url> {
    const { originUrl } = createUrlDto;
    const isExistingUrl = await this.urlRepo.findOne({
      where: { originUrl: originUrl },
    });

    if (isExistingUrl) {
      return isExistingUrl;
    }

    if (!validateUrl(originUrl)) {
      throw new HttpException(
        {
          data: null,
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid origin URL',
          error: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newId = nanoid();
    const currentEpochTime = Math.floor(Date.now() / 1000);

    const url = {
      ...(createUrlDto as object),
      originUrl: originUrl,
      shortUrl: `${this.baseUrl}${newId}`,
      bitlyUrl: null,
      nanoId: newId,
      clicks: 0,
      createdAt: currentEpochTime,
      updatedAt: currentEpochTime,
    };

    const urlData = await this.urlRepo.save(this.urlRepo.create(url));

    return urlData;
  }

  async getOriginUrl(id: string): Promise<Url> {
    const urlData: Url | null = await this.urlRepo.findOne({
      where: { nanoId: id },
    });

    if (!urlData) {
      throw new HttpException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: 'URL not found',
          error: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.urlRepo.update({ nanoId: id }, { clicks: ++urlData.clicks });
    return urlData;
  }

  async generateBitlyUrl(createUrlDto: CreateUrlShortnerDto): Promise<Url> {
    const { originUrl } = createUrlDto;
    const isExistingUrl = await this.urlRepo.findOne({
      where: { originUrl: originUrl },
    });

    if (isExistingUrl) {
      return isExistingUrl;
    }

    if (!validateUrl(originUrl)) {
      throw new HttpException(
        {
          data: null,
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid origin URL',
          error: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = await this.bitly.shorten(originUrl);
    const currentEpochTime = Math.floor(Date.now() / 1000);

    const url = {
      ...(createUrlDto as object),
      originUrl: originUrl,
      shortUrl: null,
      bitlyUrl: response.link,
      nanoId: null,
      clicks: 0,
      createdAt: currentEpochTime,
      updatedAt: currentEpochTime,
    };

    const urlData = await this.urlRepo.save(this.urlRepo.create(url));

    return urlData;
  }
  async getAllUrls(): Promise<Url[]> {
    const urlsData = await this.urlRepo.find();
    return urlsData;
  }
}

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Logger,
  Get,
  Param,
  Redirect,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AbstractApiResponse } from 'src/utils/general-response';
import { UrlShortnerService } from '../services/url-shortner.service';
import { CreateUrlShortnerDto } from '../dto/create-url-shortner.dto';

@ApiTags('url-shortner')
@Controller()
export class UrlShortnerController {
  private readonly logger = new Logger(UrlShortnerController.name);
  constructor(private readonly urlService: UrlShortnerService) {}

  @Post('urls-create')
  @HttpCode(HttpStatus.CREATED)
  async createURL<T>(
    @Body() createUrlDto: CreateUrlShortnerDto,
  ): Promise<AbstractApiResponse<T>> {
    try {
      const url = await this.urlService.generateShortUrl(createUrlDto);
      const response = AbstractApiResponse.created(url as T);
      this.logger.log('short url generated successfully');
      return response;
    } catch (error) {
      this.logger.error('Error during url generation', error);
      throw new HttpException(
        {
          data: error.response.data,
          error: error.response.error,
          status: error.response.status,
          message: error.response.message,
        },
        error.response.status,
      );
    }
  }

  @Post('urls-bitly')
  @HttpCode(HttpStatus.CREATED)
  async createBitlyURL<T>(
    @Body() createUrlDto: CreateUrlShortnerDto,
  ): Promise<AbstractApiResponse<T>> {
    try {
      const url = await this.urlService.generateBitlyUrl(createUrlDto);
      const response = AbstractApiResponse.created(url as T);
      this.logger.log('bitly url generated successfully');
      return response;
    } catch (error) {
      this.logger.error('Error during bitly url generation', error);
      console.log('type', typeof error);
      throw new HttpException(
        {
          data: error.response?.data || null,
          error: error.response?.error || error.description,
          status: error.response?.status || HttpStatus.BAD_REQUEST,
          message: error.response?.message || error.message,
        },
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('urls')
  @HttpCode(HttpStatus.OK)
  async getUrlList<T>(): Promise<AbstractApiResponse<T>> {
    try {
      const urls = await this.urlService.getAllUrls();
      const response = AbstractApiResponse.success(urls as T);
      this.logger.log('urls list fetched  successfully');
      return response;
    } catch (error) {
      this.logger.error('Error during url list', error);
      throw new HttpException(
        {
          data: error.response.data,
          error: error.response.error,
          status: error.response.status,
          message: error.response.message,
        },
        error.response.status,
      );
    }
  }

  @Get(':id')
  @Redirect()
  async redirectToURL(@Param('id') id: string): Promise<{ url: string }> {
    try {
      this.logger.debug('Redirecting to URL with id', id);
      const url = await this.urlService.getOriginUrl(id);
      return { url: url.originUrl };
    } catch (error) {
      this.logger.error('Error during redirection', error);
      throw new HttpException(
        {
          data: error.response.data,
          error: error.response.error,
          status: error.response.status,
          message: error.response.message,
        },
        error.response.status,
      );
    }
  }
}

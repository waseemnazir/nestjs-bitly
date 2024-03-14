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
  ParseUUIDPipe,
  ValidationPipe,
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

  @Post('api/v1/create-url')
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

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getURL<T>(
    @Param(
      'id',
      new ParseUUIDPipe({ version: '4' }),
      new ValidationPipe({ transform: true }),
    )
    id: string,
  ): Promise<AbstractApiResponse<T>> {
    try {
      this.logger.debug('URL id', id);
      const url = await this.urlService.getOriginUrl(id);
      const response = AbstractApiResponse.success(url as T);
      this.logger.log('url sent successfully');
      return response;
    } catch (error) {
      this.logger.error('Error during url fetching', error);
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

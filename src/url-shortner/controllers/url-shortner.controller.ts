import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AbstractApiResponse } from 'src/utils/general-response';
import { UrlShortnerService } from '../services/url-shortner.service';
import { CreateUrlShortnerDto } from '../dto/create-url-shortner.dto';

@ApiTags('url-shortner')
@Controller({
  path: 'url',
  version: '1',
})
export class UrlShortnerController {
  private readonly logger = new Logger(UrlShortnerController.name);
  constructor(private readonly urlService: UrlShortnerService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async userSignup<T>(
    @Body() createUrlDto: CreateUrlShortnerDto,
  ): Promise<AbstractApiResponse<T>> {
    try {
      const url = await this.urlService.generateShortUrl(createUrlDto);
      const response = AbstractApiResponse.created(url as T);
      this.logger.log('short url generated successfully');
      return response;
    } catch (error) {
      console.log(error);
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
}

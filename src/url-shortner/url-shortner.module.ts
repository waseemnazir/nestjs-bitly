import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlShortnerService } from './services/url-shortner.service';
import { UrlShortnerController } from './controllers/url-shortner.controller';
import { Url } from 'src/url-shortner/entities/url-shortner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [UrlShortnerController],
  providers: [UrlShortnerService],
})
export class UrlShortnerModule {}

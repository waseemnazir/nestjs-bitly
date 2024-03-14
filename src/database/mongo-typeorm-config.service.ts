import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class MongoTypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      url: this.configService.get('mongo.url'),
      useNewUrlParser: true,
      useUnifiedTopology: true,
      logging: this.configService.get('app.nodeEnv') !== 'production',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    } as TypeOrmModuleOptions;
  }
}

import { Module } from '@nestjs/common';
import { configs } from './config';
import { DataSource } from 'typeorm';
import { MongoTypeOrmConfigService } from 'src/database/mongo-typeorm-config.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlShortnerModule } from './url-shortner/url-shortner.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      envFilePath: [`.env`],
    }),
    TypeOrmModule.forRootAsync({
      useClass: MongoTypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    UrlShortnerModule,
  ],
})
export class AppModule {}

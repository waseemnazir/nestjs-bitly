import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HomeService {
  constructor(private configService: ConfigService) {}

  appInfo() {
    return {
      name: this.configService.get('APP_NAME'),
      teamName: this.configService.get('APP_TEAM_NAME'),
      version: this.configService.get('APP_VERSION'),
    };
  }
}

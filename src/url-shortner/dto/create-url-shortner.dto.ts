import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUrlShortnerDto {
  @ApiProperty({ example: 'https://devwaseem.com' })
  @IsNotEmpty()
  @IsString()
  originUrl: string;
}

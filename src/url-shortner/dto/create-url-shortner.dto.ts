import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUrlShortnerDto {
  @ApiProperty({ example: 'http://www.example.com' })
  @IsNotEmpty()
  @IsString()
  originUrl: string;
}

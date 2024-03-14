import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUrlShortnerDto {
  @ApiProperty({ example: 'http://localhost:5000' })
  @IsNotEmpty()
  @IsString()
  originUrl: string;
}

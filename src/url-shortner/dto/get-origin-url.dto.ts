import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetOriginUrlDto {
  @ApiProperty({ example: 'uuid' })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

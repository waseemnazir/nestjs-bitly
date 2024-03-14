import { PartialType } from '@nestjs/swagger';
import { CreateUrlShortnerDto } from './create-url-shortner.dto';

export class UpdateUrlShortnerDto extends PartialType(CreateUrlShortnerDto) {}

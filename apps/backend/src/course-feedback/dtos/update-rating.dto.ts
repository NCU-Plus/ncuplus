import { PickType } from '@nestjs/swagger';
import { CreateRatingDto } from './create-rating.dto';

export class UpdateRatingDto extends PickType(CreateRatingDto, [
  'value',
] as const) {}

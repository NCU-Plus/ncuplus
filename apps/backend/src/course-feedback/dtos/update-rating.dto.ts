import { PickType } from '@nestjs/mapped-types';
import { CreateRatingDto } from './create-rating.dto';

export class UpdateRatingDto extends PickType(CreateRatingDto, [
  'value',
] as const) {}

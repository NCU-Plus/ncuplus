import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty({
    description: 'The id of the profile',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the user',
  })
  name: string;

  @ApiProperty({
    type: Date,
  })
  createdAt: string;

  @ApiProperty({
    type: Date,
  })
  updatedAt: string;
}

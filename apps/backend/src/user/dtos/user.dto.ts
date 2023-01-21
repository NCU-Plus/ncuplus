import { ApiProperty } from '@nestjs/swagger';
import { ProfileDto } from '../profile/dtos/profile.dto';
import { UserRole } from '../user.entity';

export class UserDto {
  @ApiProperty({
    description: 'The id of the user',
  })
  id: number;

  @ApiProperty({
    description: 'The roles of the user',
    enum: UserRole,
    enumName: 'UserRole',
    isArray: true,
  })
  roles: UserRole[];

  @ApiProperty()
  profile: ProfileDto;
}

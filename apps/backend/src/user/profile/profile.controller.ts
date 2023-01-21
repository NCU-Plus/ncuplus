import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiResponseDto } from 'src/types/ApiResponseDto';
import { ProfileDto } from './dtos/profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ProfileHook } from './hooks/profile.hook';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@ApiTags('Users', 'Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: "The updated profile's data",
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(ProfileDto),
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiNotFoundResponse({
    description: "The profile doesn't exist",
  })
  @UseGuards(JwtAuthGuard, AccessGuard)
  @UseAbility(Actions.update, Profile, ProfileHook)
  @Put(':id')
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true }))
    profile: UpdateProfileDto,
  ) {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.profileService.updateProfile(id, profile),
    };
  }
}

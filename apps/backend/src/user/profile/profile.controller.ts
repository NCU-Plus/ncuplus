import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ProfileHook } from './hooks/profile.hook';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

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

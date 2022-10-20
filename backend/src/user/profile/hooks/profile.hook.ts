import { Injectable } from '@nestjs/common';
import { Request, SubjectBeforeFilterHook } from 'nest-casl';
import { Profile } from '../profile.entity';
import { ProfileService } from '../profile.service';

@Injectable()
export class ProfileHook implements SubjectBeforeFilterHook<Profile, Request> {
  constructor(private readonly profileService: ProfileService) {}

  async run(req: Request) {
    return await this.profileService.findById(req.params.id);
  }
}

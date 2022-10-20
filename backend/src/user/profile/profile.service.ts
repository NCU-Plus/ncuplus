import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async findById(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async createProfile(
    createProfileDto: CreateProfileDto,
    user: number,
  ): Promise<Profile> {
    const saved = await this.profileRepository.save(
      this.profileRepository.create({
        ...createProfileDto,
        user,
      }),
    );
    return saved;
  }

  async updateProfile(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.findById(id);
    const saved = await this.profileRepository.save({
      ...profile,
      ...updateProfileDto,
    });
    return saved;
  }
}

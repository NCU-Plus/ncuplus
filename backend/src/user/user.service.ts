import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileService } from './profile/profile.service';
import { User, UserRole } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'default')
    private userRepository: Repository<User>,
    private profileService: ProfileService,
  ) {}
  async getUserByPortalId(protalId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      select: ['id', 'portalId', 'identifier'],
      where: {
        portalId: protalId,
      },
    });
    return user;
  }
  async getUser(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      select: ['id', 'roles'],
    });
  }
  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find({
      select: ['id', 'roles'],
    });
    return users;
  }
  async createUser(
    portalId: number,
    identifier: string,
    studentId: string,
  ): Promise<User> {
    const user = await this.userRepository.save(
      this.userRepository.create({
        portalId: portalId,
        identifier: identifier,
        studentId: studentId,
        roles: [UserRole.STUDENT],
      }),
    );
    user.profile = await this.profileService.createProfile(
      { name: '匿名使用者' },
      user.id,
    );
    return user;
  }
}

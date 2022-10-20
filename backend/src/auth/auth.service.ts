import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async getJwtToken(user: User) {
    const payload = {
      sub: user.id,
    };
    return await this.jwtService.signAsync(payload);
  }
}

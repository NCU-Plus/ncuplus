import { Strategy } from 'passport-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { PortalUser } from './dtos/portal-user.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class OAuth2Strategy extends PassportStrategy(Strategy, 'oauth2') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
  ) {
    super({
      authorizationURL: 'https://portal.ncu.edu.tw/oauth2/authorization',
      tokenURL: 'https://portal.ncu.edu.tw/oauth2/token',
      clientID: configService.get('oauth').clientId,
      clientSecret: configService.get('oauth').clientSecret,
      callbackURL: configService.get('oauth').redirectUrl,
      scope: ['identifier', 'student-id'],
    });
  }

  userProfile(
    accessToken: string,
    done: (err?: Error | null, profile?: any) => void,
  ): void {
    firstValueFrom(
      this.httpService.get('https://portal.ncu.edu.tw/apis/oauth/v1/info', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    )
      .then((res) => done(null, res.data))
      .catch((err) => done(err, null));
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: PortalUser,
  ) {
    let user = await this.userService.getUserByPortalId(profile.id);
    if (!user) {
      if (!(profile.id && profile.identifier && profile.studentId))
        throw new BadRequestException(
          'Missing required fields (need id, identifier and studentId), get: ' +
            JSON.stringify(profile),
        );
      user = await this.userService.createUser(
        profile.id,
        profile.identifier,
        profile.studentId,
      );
    }
    return user;
  }
}

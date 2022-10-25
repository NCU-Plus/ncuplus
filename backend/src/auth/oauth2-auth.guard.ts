import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
@Injectable()
export class OAuth2AuthGuard extends AuthGuard('oauth2') {
  constructor(private readonly userService: UserService) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    let result: boolean;
    if (process.env.NODE_ENV === 'test') {
      const testUser = {
        portalId: 123456,
        identifier: '7898456',
        studentId: '111000000',
      };
      let user = await this.userService.getUserByPortalId(testUser.portalId);
      if (!user)
        user = await this.userService.createUser(
          testUser.portalId,
          testUser.identifier,
          testUser.studentId,
        );
      request.user = user;
    } else result = (await super.canActivate(context)) as boolean;
    await super.logIn(request);
    return process.env.NODE_ENV === 'test' ? true : result;
  }
}

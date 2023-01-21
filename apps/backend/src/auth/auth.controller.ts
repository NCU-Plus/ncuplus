import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOAuth2,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ApiResponseDto } from 'src/types/ApiResponseDto';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { CsrfGuard } from './csrf.guard';
import { LoginGuard } from './login.guard';
import { OAuth2AuthGuard } from './oauth2-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 302,
    description: 'Redirect to portal OAuth2 page.',
  })
  @UseGuards(OAuth2AuthGuard)
  @Get('oauth')
  async oauth(@Res() res: Response) {
    res.redirect('/');
  }

  @ApiOAuth2(['identifier:read', 'student-id:read'])
  @ApiResponse({
    status: 302,
    description: 'Redirect to web root if user pass authorize flow.',
  })
  @ApiBadRequestResponse({
    description: 'Missing required fields (need id, identifier and studentId).',
  })
  @ApiInternalServerErrorResponse({
    description: 'Server cannot get access token.',
  })
  @UseGuards(OAuth2AuthGuard)
  @Get('authorize')
  async authorize(@Res() res: Response) {
    res.redirect('/');
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'JWT token.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              properties: {
                token: { type: 'string' },
              },
            },
          },
        },
      ],
    },
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'User is not logged in.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'CSRF token is invalid.',
  })
  @UseGuards(LoginGuard, CsrfGuard)
  @Get('token')
  async token(@Req() req: Request) {
    return {
      statusCode: 200,
      message: 'OK',
      data: { token: await this.authService.getJwtToken(req.user as User) },
    };
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'Logout successfully.',
  })
  @UseGuards(LoginGuard, CsrfGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: Request) {
    await new Promise<void>((resolve, reject) => {
      req.logout((err) => {
        if (err) reject(err);
        resolve();
      });
    });
    return {
      statusCode: 200,
      message: 'OK',
    };
  }
}

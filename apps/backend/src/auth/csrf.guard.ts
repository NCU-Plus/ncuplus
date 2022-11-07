import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as csurf from 'csurf';
import { Request, Response } from 'express';

@Injectable()
export class CsrfGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();
    return await new Promise<boolean>((resolve) =>
      csurf({ cookie: true, ignoreMethods: [] })(req, res, (err: any) => {
        res.cookie('X-CSRF-TOKEN', req.csrfToken());
        if (err) resolve(false);
        resolve(true);
      }),
    );
  }
}

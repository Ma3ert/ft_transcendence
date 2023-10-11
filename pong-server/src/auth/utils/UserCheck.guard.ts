import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserCheck implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    if (!req.cookies.jwt) {
      return false;
    }
    const decoded = await this.authService.verifyAccessToken(req.cookies.jwt);
    if (!decoded) {
      return false;
    }
    const user = await this.userService.findById(decoded.sub);
    req.user = user;
    return user ? true : false;
  }
}

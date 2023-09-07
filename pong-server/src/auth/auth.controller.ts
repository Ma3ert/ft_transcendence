import {
  Controller,
  Get,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FortyTwoGuard } from './utils/FortyTwo.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Get('42/login')
  @UseGuards(FortyTwoGuard)
  handleLogin() {
    return { message: '42 authentication' };
  }

  @Get('42/callback')
  @UseGuards(FortyTwoGuard)
  handleRedirect(@Req() req: Request) {
    return { user: req.user };
  }

  @Get('42/logout')
  handleLogout(@Req() req: Request) {
    req.logOut(function (err) {
      if (err)
        throw new HttpException(
          'Error in the auth module',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    });
    return { status: 'success', message: 'User logout succesfully' };
  }
}

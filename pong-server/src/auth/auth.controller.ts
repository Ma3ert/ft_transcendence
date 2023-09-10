import {
  Controller,
  Get,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { FortyTwoGuard } from './utils/FortyTwo.guard';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('42/login')
  @UseGuards(FortyTwoGuard)
  handleLogin() {
    return { message: '42 authentication' };
  }

  @Get('42/callback')
  @UseGuards(FortyTwoGuard)
  handleRedirect(@Req() req: Request) {
    return { user: req.session.id };
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

  @Post('local/login')
  @UseGuards(AuthGuard('local'))
  handleLocalLogin() {
    return { message: 'Local authentication' };
  }

  @Get('/twoFactor')
  requestTwoFactorPin(@Req() request: any) {
    this.authService.generateTwoFactorPin(request.user);
  }

  @Post('/twoFactor')
  validateTwoFactorPin(@Req() request: any, @Body('pin') pin: string) {
    this.authService.validateTwoFactorPin(request.user, pin);
  }
}

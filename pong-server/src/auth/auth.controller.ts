import {
  Controller,
  Get,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  Post,
  Body,
  Res,
  Patch,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoggedInGuard } from './utils/LoggedIn.guard';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @Get('42/login')
  @UseGuards(AuthGuard('42'))
  handleLogin() {
    return { message: '42 authentication' };
  }

  @Get('42/callback')
  @UseGuards(AuthGuard('42'))
  async handleRedirect(@Req() req: any, @Res() res: Response) {
    const token = await this.authService.generateAccessToken(req.user);
    res.cookie('jwt', token);
    res.status(200).json({ message: 'Authenticated' });
  }

  @Get('42/logout')
  handleLogout(@Res() res: Response) {
    //TODO: should set the 2FA validation to false.
    res.cookie('jwt', '');
    return { status: 'success', message: 'User logout successfully.' };
  }

  @Post('local/login')
  @UseGuards(AuthGuard('local'))
  async handleLocalLogin(@Req() req: any, @Res() res: Response) {
    const token = await this.authService.generateAccessToken(req.user);
    res.cookie('jwt', token);
    res.status(200).json({ message: 'Authenticated' });
  }

  @Patch('/twoFactor')
  @UseGuards(LoggedInGuard)
  async updateTwoFactorStatus(@Req() req: any, @Body('twoFactor') status: boolean) {
    this.authService.alterTwoFactorStatus(status, req.user);
  }

  @Get('/twoFactor')
  @UseGuards(LoggedInGuard)
  async requestTwoFactorPin(@Req() request: any) {
    const pin = await this.authService.generateTwoFactorPin(request.user);
    if (!pin)
      throw new HttpException(
        'You do not have enough permission please login again.',
        HttpStatus.UNAUTHORIZED,
      );
    //! Should change this response and remove the pin
    return { status: 'success', pinNumber: pin };
  }

  @Post('/twoFactor')
  async validateTwoFactorPin(@Req() request: any, @Body('pin') pin: string) {
    if (!request.user)
      throw new HttpException(
        'You do not have enough permission please login again.',
        HttpStatus.UNAUTHORIZED,
      );
    const user = await this.usersService.findById(request.user.id);
    if (user.twoFactorRetry >= 3)
      throw new HttpException(
        'You have reached maxium numbers of retires please contact an adminstrator to unlock you account.',
        HttpStatus.UNAUTHORIZED,
      );
    const result = await this.authService.validateTwoFactorPin(pin, request.user);
    if (!result)
      throw new HttpException('Invalid 2FA Pin number please provide a valid one.', HttpStatus.UNAUTHORIZED);
    return { status: 'success', message: 'Pin validated succesfully.' };
  }
}

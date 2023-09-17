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
} from '@nestjs/common';
import { FortyTwoGuard } from './utils/FortyTwo.guard';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoggedInGuard } from './utils/LoggedIn.guard';
import { LocalAuthGuard } from './utils/LocalAuth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('42/login')
  @UseGuards(FortyTwoGuard)
  handleLogin() {
    return { message: '42 authentication' };
  }

  @Get('42/callback')
  @UseGuards(FortyTwoGuard)
  async handleRedirect(@Req() req: any, @Res() res: Response) {
    console.log(req.user);
    const token = await this.authService.generateAccessToken(req.user);
    console.log(token);
    res.cookie('jwt', token)
    res.status(200).json({message: "Worked"})
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
    return { status: 'success', message: 'User logout successfully.' };
  }

  @Post('local/login')
  @UseGuards(LocalAuthGuard)
  handleLocalLogin(@Req() req: Request) {
    return { status: 'success', message: 'User logged in successfully.' };
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
      throw new HttpException(
        'Invalid 2FA Pin number please provide a valid one.',
        HttpStatus.UNAUTHORIZED,
      );
    return { status: 'success', message: 'Pin validated succesfully.'}
  }
}

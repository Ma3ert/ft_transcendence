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
import { UserCheck } from './utils/UserCheck.guard';

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
    // res.status(200).json({status: 'success', message: "User authenticated successfully"})
    res.redirect("http://127.0.0.1:3001/ChangeUserName")
  }

  @Get('42/logout')
  @UseGuards(LoggedInGuard)
  async handleLogout(@Res() res: Response, @Req() req: any) {
    const user = await this.usersService.updateUserAuth(req.user.id, {
      pinValidated: false,
    });
    res.cookie('jwt', '');
    res.status(200).json({ message: 'User logged out successfully.' });
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
  async updateTwoFactorStatus(@Req() req: any, @Body('activate') status: boolean) {
    if (this.authService.alterTwoFactorStatus(status, req.user))
      return { status: 'success', message: `two factor authentification ${status ? 'enabled' : 'disabled'}` };
  }

  @Get('/twoFactor')
  @UseGuards(UserCheck)
  async requestTwoFactorPin(@Req() request: any) {
    const pin = await this.authService.generateTwoFactorPin(request.user);
    if (!pin)
      throw new HttpException('Failed to generate two factor code, please retry.', HttpStatus.UNAUTHORIZED);
    const email = await this.authService.sendTwoFactorToken(pin.toString(), request.user);
    if (email)
      return {
        status: 'success',
        message: 'Two factor code sent to your 42 intra email, please check your mailbox.',
      };
  }

  @Post('/twoFactor')
  @UseGuards(UserCheck)
  async validateTwoFactorPin(@Req() request: any, @Body('pin') pin: string) {
    const user = await this.usersService.findById(request.user.id);
    if (user.twoFactorPinExpires <= new Date(Date.now()))
      throw new HttpException(
        'The Token you have provided is expired please request a new one.',
        HttpStatus.UNAUTHORIZED,
      );
    if (user.twoFactorRetry >= 3)
      throw new HttpException(
        'You have reached maxium numbers of retires please contact an adminstrator to unlock you account.',
        HttpStatus.UNAUTHORIZED,
      );
    const result = await this.authService.validateTwoFactorPin(pin, request.user);
    if (!result)
      throw new HttpException('Invalid 2FA Pin number please provide a valid one.', HttpStatus.UNAUTHORIZED);
    return { status: 'success', message: 'Pin validated successfully.' };
  }
}

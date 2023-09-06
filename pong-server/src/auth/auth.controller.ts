import { Controller, Get, UseGuards } from '@nestjs/common';
import { FortyTwoGuard } from './utils/FortyTwo.guard';

@Controller('auth')
export class AuthController {
  @Get('42/login')
  @UseGuards(FortyTwoGuard)
  handleLogin() {
    return { message: '42 authentication' };
  }

  @Get('42/callback')
  @UseGuards(FortyTwoGuard)
  handleRedirect() {
    return { message: 'OK' };
  }
}

import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as pug from 'pug';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}
  async validateUser(userData: User) {
    let user = await this.usersService.findOne(userData.email);
    if (!user) user = await this.usersService.createUser(userData);
    if (user) await this.usersService.updateUserAuth(user.id, { status: 'ONLINE' });
    return user;
  }

  async generateAccessToken(user: User) {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload);
  }

  async verifyAccessToken(token: string) {
    //! Should do the necessary check for user validaion
    try {
      return await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
    } catch (e) {
      return null;
    }
  }

  async sendTwoFactorToken(token: string, user: User) {
    const html = pug.renderFile(process.cwd() + '/public/template/twofactor.pug', {
      twoFactorCode: token,
    });

    const email = await this.mailerService.sendMail({
      to: user.email,
      from: 'support@mightypong.com',
      subject: 'Two factor verification code',
      html,
      text: `Your verfication code: ${token}`,
    });
    return email;
  }

  async getTokenUser(authorization: string) {
    const token = authorization.split(' ')[1];
    if (!token) return null;
    const decoded = await this.verifyAccessToken(token);
    const user = await this.usersService.findById(decoded.sub);
    return user;
  }

  async generateTwoFactorPin(userData: User) {
    // Generate a two factor pin
    if (!userData) return null;
    const rawPin = Math.floor(Math.random() * 899999) + 100000;
    const Pin = await bcrypt.hash(rawPin.toString(), 12);

    // Save it to the database
    await this.usersService.updateUserAuth(userData.id, {
      twoFactorPin: Pin,
    });
    // Send it to the user email
    return rawPin;
  }

  async alterTwoFactorStatus(status: boolean, userReq: User) {
    const user = await this.usersService.findById(userReq.id);
    if (user.twoFactor && !user.pinValidated) return null;
    return await this.usersService.updateUserAuth(user.id, { twoFactor: status });
  }

  async validateTwoFactorPin(pin: string, user: AuthUserDto) {
    // Check if the two factor pin match
    const validated = await bcrypt.compare(pin, user.twoFactorPin);
    if (!validated) {
      await this.usersService.updateUserAuth(user.id, {
        twoFactorRetry: user.twoFactorRetry + 1,
      });
      return null;
    }
    // Alter the the pinValidation status if the pin is validated
    return await this.usersService.updateUserAuth(user.id, {
      pinValidated: true,
      twoFactorPin: undefined,
    });
  }
}

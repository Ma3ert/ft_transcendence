import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(userData: User) {
    let user = await this.usersService.findOne(userData.email);
    if (!user) user = await this.usersService.createUser(userData);
    return user;
  }

  async generateTwoFactorPin(userData: User) {
    // Generate a two factor pin
    if (!userData)
      throw new HttpException(
        'You need to authenticate using you intra account first.',
        HttpStatus.UNAUTHORIZED,
      );
    const rawPin = Math.floor(Math.random() * 899999) + 100000;
    const Pin = await bcrypt.hash(rawPin.toString(), 12);

    // Save it to the database
    await this.usersService.updateUserAuth(userData.id, {
      twoFactorPin: Pin,
    });
    // Send it to the user email
    console.log('Pin:', rawPin);
  }

  async validateTwoFactorPin(userData: User, authPin: string) {
    // Check if the two factor pin match
    if (!userData)
    throw new HttpException(
      'You need to authenticate using you intra account first.',
      HttpStatus.UNAUTHORIZED,
    );
    const user = await this.usersService.findById(userData.id);
    if (user.twoFactorRetry <= 3)
      throw new HttpException(
        'You have reached maxium numbers of retires please contact an adminstrator to unlock you account.',
        HttpStatus.UNAUTHORIZED,
      );
    const validated = await bcrypt.compare(authPin, user.twoFactorPin);
    // Alter the the pinValidation status if the pin is validated
    if (!validated)
      return await this.usersService.updateUserAuth(user.id, {
        twoFactorRetry: user.twoFactorRetry + 1,
      });
    await this.usersService.updateUserAuth(user.id, { pinValidated: true });
  }
}

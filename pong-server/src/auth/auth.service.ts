import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

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
      return null;
    const rawPin = Math.floor(Math.random() * 899999) + 100000;
    const Pin = await bcrypt.hash(rawPin.toString(), 12);

    // Save it to the database
    await this.usersService.updateUserAuth(userData.id, {
      twoFactorPin: Pin,
    });
    // Send it to the user email
    return rawPin;
  }

  async validateTwoFactorPin(pin: string, user: UpdateUserDto) {
    // Check if the two factor pin match

    // Alter the the pinValidation status if the pin is validated
    const validated = await bcrypt.compare(pin, user.twoFactorPin);
    console.log("Validation result:", validated);
    if (!validated)
    {
      await this.usersService.updateUserAuth(user.id, {
        twoFactorRetry: user.twoFactorRetry + 1,
      });
      return null;
    }
    return await this.usersService.updateUserAuth(user.id, { pinValidated: true, twoFactorPin: undefined });
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { UpdateUserDto } from './update-user.dto';


export class AuthUserDto extends PartialType(UpdateUserDto) {
  twoFactor?: boolean;
  twoFactorPin?: string;
  pinValidated?: boolean;
  twoFactorRetry?: number;
  // laddelLevel?: number;
  // xp?: number;
}

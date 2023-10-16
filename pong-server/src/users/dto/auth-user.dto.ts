import { PartialType } from '@nestjs/mapped-types';
import { UpdateUserDto } from './update-user.dto';


export class AuthUserDto extends PartialType(UpdateUserDto) {
  id?: string;
  twoFactor?: boolean;
  twoFactorPin?: string;
  pinValidated?: boolean;
  twoFactorStatus?: boolean;
  twoFactorRetry?: number;
  twoFactorPinExpires?: Date;
  // laddelLevel?: number;
  // xp?: number;
}

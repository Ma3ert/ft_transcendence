import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  xp?: number;
  activated?: number;
  twoFactor?: boolean;
  laddelLevel?: number;
  twoFactorPin?: string;
  pinValidated?: boolean;
  twoFactorRetry?: number;
}

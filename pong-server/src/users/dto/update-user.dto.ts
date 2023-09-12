import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

enum GameStatus {
  READY,
  NOTREADY,
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id?: string;
  activated?: boolean;
  twoFactor?: boolean;
  twoFactorPin?: string;
  pinValidated?: boolean;
  twoFactorRetry?: number;
  // gameStatus?: GameStatus;
  status?: 'ONLINE' | 'OFFLINE' | 'INMATCH';
  // laddelLevel?: number;
  // xp?: number;
}

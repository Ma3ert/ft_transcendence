export class User {
  id?: string;
  username?: string;
  email?: string;
  avatar?: string;
  twoFactor?: boolean;
  twoFactorPinExpires?: Date;
  xp?: number;
  ladelLevel?: number;
  status?: 'ONLINE' | 'OFFLINE' | 'INMATCH';
}

export class User {
  id?: string;
  username?: string;
  email?: string;
  avatar?: string;
  twoFactor?: boolean;
  twoFactorPinExpires?: Date;
  xp?: number;
  level?: number;
  status?: 'ONLINE' | 'OFFLINE' | 'INMATCH';
}

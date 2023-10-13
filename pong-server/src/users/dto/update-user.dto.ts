//! Should add validation here.
export class UpdateUserDto {
  username: string;
  avatar: string;
  activated?: boolean;
  status?: 'ONLINE' | 'OFFLINE' | 'INMATCH';
  // laddelLevel?: number;
  // xp?: number;
}

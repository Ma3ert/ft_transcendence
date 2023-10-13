import {  IsNotEmpty, IsOptional, IsString } from 'class-validator';

//! Should add validation here.
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username: string;

  avatar: string;

  @IsOptional()
  @IsString()
  activated?: boolean;

  status?: 'ONLINE' | 'OFFLINE' | 'INMATCH';
  // laddelLevel?: number;
  // xp?: number;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInviteDto {
  @IsString()
  @IsNotEmpty()
  inviteOwnerId: string;

  @IsString()
  @IsNotEmpty()
  invitedUserId: string;
}

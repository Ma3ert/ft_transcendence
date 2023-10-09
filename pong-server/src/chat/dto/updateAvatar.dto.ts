import { IsNotEmpty } from "class-validator";

export class updateChannelAvatar{
    @IsNotEmpty()
    avatar: string

    @IsNotEmpty()
    channel: string
}
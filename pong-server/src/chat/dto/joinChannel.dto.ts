import { Role } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class joinChannelDto{
    @IsNotEmpty()
    @IsString()
    userId:string

    @IsNotEmpty()
    @IsString()
    channelId:string

    @IsNotEmpty()
    role:Role
}
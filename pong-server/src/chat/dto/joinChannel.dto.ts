import { Role } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class joinChannelDto{
    @IsNotEmpty()
    @IsOptional()
    password:string
}
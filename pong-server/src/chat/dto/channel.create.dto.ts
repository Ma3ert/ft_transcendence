import { Type } from "@prisma/client"
import { IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator"

export class createChannelDto{
    @IsString()
    name:string

    @IsNotEmpty()
    type:Type

    @IsStrongPassword()
    @IsOptional()
    password:string

    @IsNotEmpty()
    @IsOptional()
    avatar:string

    @IsString()
    @IsNotEmpty()
    ownerId:string
}
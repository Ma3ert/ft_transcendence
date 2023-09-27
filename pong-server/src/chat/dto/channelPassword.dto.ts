import { IsNotEmpty } from "class-validator"

export class changeChannelPasswordDto{

    @IsNotEmpty()
    currentPassword:string
    
    @IsNotEmpty()
    newPassword:string
}

export class setPasswordDto{

    @IsNotEmpty()
    password:string
}
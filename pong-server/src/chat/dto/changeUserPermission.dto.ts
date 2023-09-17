import { Role } from "@prisma/client"
import { IsNotEmpty } from "class-validator"

export class changeUserPermissionDto{
    @IsNotEmpty()
    user:string
    
    @IsNotEmpty()
    channel:string

    @IsNotEmpty()
    role:Role
}
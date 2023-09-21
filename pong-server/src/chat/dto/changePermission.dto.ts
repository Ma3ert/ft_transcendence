import { Role } from "@prisma/client"
import { IsNotEmpty } from "class-validator"

export class ChangePermissionDto{
    @IsNotEmpty()
    user:string

    @IsNotEmpty()
    role:Role
}
import { IsNotEmpty } from "class-validator"

export class banDto{
    @IsNotEmpty()
    banned:string
}
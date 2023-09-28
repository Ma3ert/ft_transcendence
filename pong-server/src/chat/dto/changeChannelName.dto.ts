import { IsNotEmpty } from "class-validator";

export class changeChannelName{
    @IsNotEmpty()
    name:string
}
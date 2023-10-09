import { Type } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class visibilityDto{
    @IsNotEmpty()
    type:Type
}
import { Type } from "@prisma/client"

export class updateChannelDto{
    name:string

    type: Type

    password: string
}
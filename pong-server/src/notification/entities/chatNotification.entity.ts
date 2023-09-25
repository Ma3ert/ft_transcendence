import { NotificationType } from "@prisma/client";

export class chatNotification {
    constructor(public id:string, public type:NotificationType){}
}
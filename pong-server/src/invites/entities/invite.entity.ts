import { User } from "src/users/entities/user.entity";

export class Invite {
    id?: string;
    invitedUser: User;
    inviteOwner: User;
    inviteUserId?: string;
    inviteOwnerId?: string;
    createdAt?: Date;
}

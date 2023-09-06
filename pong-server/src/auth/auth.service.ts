import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService 
{
    constructor(private readonly usersService: UsersService){}
    async validateUser(userEmail: string)
    {
        let user = await this.usersService.findOne(userEmail);
        if (!user)
        {
            console.log("Could not find user creating..");
            user = await this.usersService.createUser({email: userEmail});
        }
        return (user);
    }
}
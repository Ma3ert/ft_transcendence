import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService 
{
    constructor(private readonly usersService: UsersService){}
    async validateUser(userdetails: User)
    {
        let user = await this.usersService.findOne(userdetails.email);
        if (!user)
            user = await this.usersService.createUser(userdetails);
        return (user);
    }
}
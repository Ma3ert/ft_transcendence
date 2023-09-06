import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService 
{
    constructor(private readonly usersService: UsersService){}
    async validateUser(userData: User)
    {
        let user = await this.usersService.findOne(userData.email);
        if (!user)
            user = await this.usersService.createUser(userData);
        return (user);
    }
}
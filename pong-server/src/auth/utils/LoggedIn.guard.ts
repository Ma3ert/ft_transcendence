import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "../auth.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private readonly authService: AuthService, private readonly userService: UsersService)
    {}

    async canActivate(context: ExecutionContext): Promise<boolean> 
    {
        const req: Request = context.switchToHttp().getRequest();
        if (!req.cookies.jwt)
            return false;
        const decoded = await this.authService.verifyAccessToken(req.cookies.jwt);
        const user = await this.userService.findById(decoded.sub);
        req.user = user;
        if (user)
            return true
        //! Need to add the logic for 2FA auth validation here.
        // console.groupCollapsed("Request:", req);
        // if (req.user && !req.user.twoFactor)
        //     console.log("Two Factor auth is not enabled");
        // console.log(req.isAuthenticated())
        return false;   
    }
}
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class LoggedInGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> 
    {
        const req: Request = context.switchToHttp().getRequest();
        //! Need to add the logic for 2FA auth validation here.
        // console.groupCollapsed("Request:", req);
        // if (req.user && !req.user.twoFactor)
        //     console.log("Two Factor auth is not enabled");
        return req.isAuthenticated();   
    }
}
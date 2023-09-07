import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class LoggedInGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> 
    {
        const req: any = context.switchToHttp().getRequest();
        if (req.user && !req.user.twoFactor)
            console.log("Two Factor auth is not enabled");
        return req.isAuthenticated();   
    }
}
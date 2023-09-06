import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class LoggedInGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> 
    {
        const req: Request = context.switchToHttp().getRequest();
        return req.isAuthenticated();   
    }
}
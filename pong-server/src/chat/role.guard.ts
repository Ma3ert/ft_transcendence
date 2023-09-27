import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor (private reflector: Reflector,
                 private prismaService: PrismaService) {}

    async canActivate(context: ExecutionContext):Promise<boolean>{
        const requireRole = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requireRole){
            return true;
        }
        const request: Request = context.switchToHttp().getRequest();
        if (!request.user || request.user === undefined)
            return false;
        const user = request.user['id'] as string;
        const channel = request.params.channelId;
        const roles = await this.prismaService.channelUser.findFirst({
            where:{
                userId:user,
                channelId:channel,
            },
            select:{
                role:true,
            }
        })
        if (!roles || roles === undefined)
            return false;
        const isbanned = await this.prismaService.channelBan.findUnique({
            where:{
                userId_channelId:{
                    userId:user,
                    channelId:channel
                }
            }
        })
        if(isbanned)
            return false;
        return requireRole.some((role) => roles.role.includes(role));
    }
}

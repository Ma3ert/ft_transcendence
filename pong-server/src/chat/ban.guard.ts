import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BanGuard implements CanActivate {
    constructor(private reflector: Reflector,
        private prismaService: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        if (!request.user || request.user === undefined)
            return false;
        const user = request.user['id'] as string;
        const channel = request.params.channelId;
        const isBanned = await this.prismaService.channelBan.findFirst({
            where: {
                userId: user,
                channelId: channel,
            }
        });
        const isMuted = await this.prismaService.channelMute.findFirst({
            where: {
                userId: user,
                channelId: channel
            }
        });
        return (!isBanned && !isMuted);
    }
}

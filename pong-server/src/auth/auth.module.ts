import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FortyTwoStrategy } from './utils/FortyTwoStrategy';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './utils/LocalStrategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule.register({secret: process.env.JWT_SECRET, signOptions: { expiresIn: '30d'}})],
  controllers: [AuthController],
  providers: [
    FortyTwoStrategy,
    LocalStrategy,
    AuthService,
  ],
})
export class AuthModule {}

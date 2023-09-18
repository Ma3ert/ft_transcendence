import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FortyTwoStrategy } from './utils/FortyTwoStrategy';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { SessionSerializer } from './utils/Serializer';
import { LocalStrategy } from './utils/LocalStrategy';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    FortyTwoStrategy,
    LocalStrategy,
    SessionSerializer,
    AuthService,
  ],
})
export class AuthModule {}

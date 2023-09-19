import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FortyTwoStrategy } from './utils/FortyTwoStrategy';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './utils/LocalStrategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule.register({secret: 'something werid to see', signOptions: { expiresIn: '5h'}})],
  controllers: [AuthController],
  providers: [
    FortyTwoStrategy,
    LocalStrategy,
    AuthService,
  ],
})
export class AuthModule {}

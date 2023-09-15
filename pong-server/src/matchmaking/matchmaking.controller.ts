import { Body, Controller, Post } from '@nestjs/common';
import { MatchmakingService } from './matchmaking.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('matchmaking')
export class MatchmakingController {
  constructor(private readonly matchmakingService: MatchmakingService) {}
  @Post('insert')
  joinGame(@Body() user: CreateUserDto) {
    // !Should check if the user is already in a game session.
    this.matchmakingService.addPlayer({
      ...user,
      xp: Math.round((Math.random() * 10 * 3000))
    });
  }
}

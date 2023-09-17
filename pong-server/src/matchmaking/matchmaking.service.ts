import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MatchmakingService {
    private matchQueue: User[] = [];

    joinQueue()
    {
        
    }
}

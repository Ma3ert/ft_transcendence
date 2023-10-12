import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggedInGuard } from 'src/auth/utils/LoggedIn.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageOptimizerPipe } from './utils/imageOptimizer.pipe';
import { secureUserObject } from './utils/secureUserObject';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(LoggedInGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Post('/block')
  @UseGuards(LoggedInGuard)
  async blockUser(@Body('userId') user: string, @Req() req: any) {
    const blocked = await this.usersService.blockFriend(req.user.id, user);
    if (!blocked) return { status: 'failure', message: 'Could not block friend from your friendslist.' };
    return { status: 'success', message: `User ${user} has been blocked successfully.` };
  }

  @Post('/unblock')
  @UseGuards(LoggedInGuard)
  async unblockUser(@Body('userId') user: string, @Req() req: any) {
    const unblocked = await this.usersService.unblockFriend(req.user.id, user);
    if (!unblocked) return { status: 'failure', message: 'Could not unblock friend from your blockedlist.' };
    return { status: 'success', message: `User ${user} has been unblocked successfully.` };
  }

  @Get('/block/:id')
  @UseGuards(LoggedInGuard)
  async checkUserBlocked(@Param('id') user: string, @Req() req: any) {
    if (user === req.user.id)
      return {
        status: 'failure',
        message: 'Checked user needs to different from the current logged in user.',
      };
    const result = await this.usersService.checkBlocked(req.user.id, user);
    return { status: 'success', blocked: result };
  }

  @Get('me')
  @UseGuards(LoggedInGuard)
  getCurrentUser(@Req() req) {
    return { status: 'success', data: secureUserObject(
      req.user,
      'twoFactorRetry',
      'twoFactor',
      'twoFactorPin',
      'twoFactorPinExpires',
      "blockedUserId",
      "friendsListId"
    ), };
  }

  @Get('friends')
  @UseGuards(LoggedInGuard)
  async getUserFriends(@Req() req: any) {
    const friends = await this.usersService.getUserFriends(req.user.id);
    return { status: 'success', count: friends.length, friends };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    //? This route should calculate properties like stats (wins or loses) and get all user game history
    console.log(id);
    return await this.usersService.getUserData(id);
  }

  @Patch()
  @UseGuards(LoggedInGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async update(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 3000 * 1000 }), // 3MB
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
        fileIsRequired: false
      }),
      imageOptimizerPipe,
    )
    image: string,
    @Req() req: any,
    @Body() updateUserDto: UpdateUserDto, 
  ) {
    if (image) updateUserDto.avatar = image;
    const user = await this.usersService.updateUser(req.user.id, updateUserDto);
    if (user) return { status: 'success', user };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}

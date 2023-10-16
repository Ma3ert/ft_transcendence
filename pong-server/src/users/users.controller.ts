import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggedInGuard } from 'src/auth/utils/LoggedIn.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageOptimizerPipe } from './utils/imageOptimizer.pipe';

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
  async getCurrentUser(@Req() req) {
    const user = await this.usersService.getUserData(req.user.id, [
      'twoFactorRetry',
      'twoFactor',
      'twoFactorStatus',
      'twoFactorPin',
      'twoFactorPinExpires',
    ]);
    if (!user) throw new NotFoundException(`Could not find user: ${req.user.id}`);
    return { status: 'success', current: user };
  }

  @Get('friends')
  @UseGuards(LoggedInGuard)
  async getUserFriends(@Req() req: any) {
    const friends = await this.usersService.getUserFriends(req.user.id);
    return { status: 'success', friends };
  }

  @Get("rank/local")
  @UseGuards(LoggedInGuard)
  async getUserRank(@Req() req: any)
  {
    const rank = await this.usersService.getUserLocalRank(req.user.id);
    if (!rank)
      throw new NotFoundException(`Could not get rank for current user`);
    return { status: "success", current: rank }
  }

  @Get(':id')
  @UseGuards(LoggedInGuard)
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.getUserData(id, [
      'twoFactorRetry',
      'twoFactor',
      'twoFactorPin',
      'twoFactorStatus',
      'twoFactorPinExpires',
      'activated',
      'pinValidated',
      'games'
    ]);
    if (!user) throw new NotFoundException(`Could not find user: ${id}`);
    return { status: 'success', user };
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
        fileIsRequired: false,
      }),
      imageOptimizerPipe,
    )
    image: string,
    @Req() req: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (image) updateUserDto.avatar = image;
    if (typeof updateUserDto.activated === 'string') {
      updateUserDto.activated === 'true'
        ? (updateUserDto.activated = true)
        : (updateUserDto.activated = false);
    }
    const user = await this.usersService.updateUser(req.user.id, updateUserDto);
    if (!user) throw new BadRequestException('Could not update user');
    return { status: 'success', user };
  }
}

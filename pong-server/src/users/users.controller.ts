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

  @Get('current')
  getCurrentUser(@Req() req) {
    return { status: 'success', data: req.user };
  }

  @Get()
  @UseGuards(LoggedInGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    //? This route should calculate properties like stats (wins or loses) and get all user game history
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  async update(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 3000 * 1000 }), // 3MB
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
      imageOptimizerPipe,
    )
    image: string,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (image) updateUserDto.avatar = image;
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

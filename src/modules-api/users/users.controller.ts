import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Patch()
  update(@User() user, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user, updateUserDto);
  }

  @Get('/saved-images')
  getSavedImages(@User() user){
    return this.usersService.getSavedImages(user);
  }

  @Get('/created-images')
  getCreatedImages(@User() user){
    return this.usersService.getCreatedImages(user)
  }
}

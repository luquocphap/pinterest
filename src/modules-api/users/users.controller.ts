import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/common/decorators/user.decorator';
import { Permissions } from 'src/common/decorators/permission.decorator';
import { ApiParam } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put()
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

  @Get(':id')
  @ApiParam({ name: "id", type: "number", description: "id người dùng" })
  @UseInterceptors(ClassSerializerInterceptor)
  @Permissions('READ', 'USER_PROFILE')
  async getUserInfo(@Param('id', ParseIntPipe) id){
    const user = await this.usersService.getUserInfo(id);
    return new UserEntity(user as UserEntity);
  }
}

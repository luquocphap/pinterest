import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SavingsService } from './savings.service';
import { SaveDto } from './dto/save.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller('savings')
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}

  @Post('')
  saveImage(@Body() body: SaveDto, @User() user){
    return this.savingsService.saveImage(body, user)
  }

  @Get('/check/:imageId')
  checkSaving(@Param('imageId', ParseIntPipe) imageId: number, @User() user){
    return this.savingsService.checkSaving(imageId, user);
  }
}

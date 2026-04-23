import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/common/decorators/user.decorator';
import type { users } from '@prisma/client';
import { FindCommentDto } from './dto/find-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @User() user: users) {
    return this.commentsService.create(createCommentDto, user);
  }

  @Get(":imageId")
  findAllByImage(@Param('imageId', ParseIntPipe) id: number, @Req() req: FindCommentDto) {
    return this.commentsService.findAllByImage(id, req);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: users) {
    return this.commentsService.remove(+id, user);
  }
}

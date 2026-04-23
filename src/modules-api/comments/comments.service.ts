import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { buildQueryPrisma } from 'src/common/helpers/build-prisma-query.helper';
import type { users } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService){}
  async create(createCommentDto: CreateCommentDto, user: users) {
    const userId = user.id;
    const newComment = await this.prisma.comments.create({
      data: {
        imageId: createCommentDto.imageId,
        content: createCommentDto.content,
        userId: userId
      }
    })

    return newComment;
  }

  async findAllByImage(imageId: number, req) {
    const { page, pageSize, index } = buildQueryPrisma(req);
    const commentsPromise = this.prisma.comments.findMany({
      where: {
        imageId: imageId
      },
      skip: index,
      take: pageSize,
      select: {
        content: true,
        users: {
          select: {
            id: true,
            fullName: true
          }
        }
      }
    });

    const totalItemPromise = this.prisma.comments.count({
      where: {
        imageId: imageId
      }
    });

    const [comments, totalItem] = await Promise.all([
      commentsPromise,
      totalItemPromise
    ]);

    const totalPage = Math.ceil(totalItem / pageSize);

    const result = {
      totalItem: totalItem,
      totalPage: totalPage,
      page: page,
      pageSize: pageSize,
      items: comments
    }

    return result
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.prisma.comments.findUnique({
      where: {
        id: id,
        isDeleted: false
      }
    });

    if (!comment) throw new BadRequestException("Image does not exist");

    await this.prisma.comments.update({
      where: {
        id: id
      },
      data: {
        ...(updateCommentDto.content !== undefined && { content: updateCommentDto.content })
      }
    })

    return true
  }

  async remove(id: number, user: users) {
    const comment = await this.prisma.comments.findUnique({
      where: {
        id: id,
        isDeleted: false
      }
    });

    if (!comment) throw new BadRequestException("Comment Does not exists");
    if (comment.userId !== user.id) throw new ForbiddenException("you cannot delete other's comment")

    await this.prisma.comments.update({
      where: {
        id: id
      },
      data: {
        isDeleted: true,
        deletedBy: user.id
      }
    })

    return true;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { buildQueryPrisma } from 'src/common/helpers/build-prisma-query.helper';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService){}
  async create(createCommentDto: CreateCommentDto, userId: number) {
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

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}

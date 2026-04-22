import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, ParseIntPipe, Req, Query } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/modules-system/cloudinary/cloudinary.service';
import { User } from 'src/common/decorators/user.decorator';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ImageUploadDto } from './dto/image-upload.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FindImageDto } from './dto/find-image.dto';
import type { users } from '@prisma/client';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService, private cloudinaryService: CloudinaryService) {}

  @Post('/')
  async create(@Body() body: CreateImageDto, @User() user: users){
    return this.imagesService.create(body, user);
  }

  @Post('/:imageId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: ImageUploadDto,
  })
  @UseInterceptors(FileInterceptor('image_file'))
  async uploadImage(
    @Param('imageId', ParseIntPipe)
    imageId: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: ".(png|jpeg|jpg|webp)" })
        .addMaxSizeValidator({ maxSize: 1024 * 1024 * 5 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})
    ) 
    file: Express.Multer.File
  ) {
    return await this.imagesService.uploadImage(file, imageId)
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(2000)
  findAll(@Query() query: FindImageDto) {
    return this.imagesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string, @User() user: users) {
    return this.imagesService.remove(+id, user);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { CloudinaryService } from 'src/modules-system/cloudinary/cloudinary.service';
import { buildQueryPrisma } from 'src/common/helpers/build-prisma-query.helper';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService, private cloudinaryService: CloudinaryService) {}
  async create(createImageDto: CreateImageDto, userId: number) {

    const { title, description } = createImageDto;
    const newImage = await this.prisma.images.create({
      data: {
        title: title,
        description: description,
        userId: userId
      }
    })

    return newImage
  }

  async uploadImage(file: Express.Multer.File, imageId: number){
    // delete old image (if need)
    const oldImage = await this.prisma.images.findUnique({
      where: {
        id: imageId
      }
    });

    if (oldImage?.link) {
      this.cloudinaryService.deleteImage(oldImage.link)
    }

    // Upload and get public_id
    const result = await this.cloudinaryService.uploadImage(file);
    const url = result.public_id;
    
    // update Link of image on database
    const updateImage = await this.prisma.images.update({
      where: {
        id: imageId,
      },

      data: {
        link: url
      }
      
    })

    return updateImage
  }

  async findAll(req) {
    const { page, pageSize, index, where } = buildQueryPrisma(req);

    const imagesPromise = this.prisma.images.findMany({
      where: where,
      skip: index,
      take: pageSize,
      include: {
        users: true
      }
    })

    const totalItemPromise = this.prisma.images.count({
      where: where
    })

    const [images, totalItem] = await Promise.all([
      imagesPromise,
      totalItemPromise
    ])

    const totalPage = Math.ceil(totalItem / pageSize);

    const result = {
      totalItem: totalItem,
      totalPage: totalPage,
      page: page,
      pageSize: pageSize,
      items: images,
    }
    
    // await this.cacheManager.set('article', result);
    // console.dir(this.cacheManager.stores, {colors: true, depth: null});

    return result;
  }

  findOne(id: number) {
    const image = this.prisma.images.findUnique({
      where: {
        id: id
      },
      include: {
        users: true
      }
    });

    if (!image) throw new BadRequestException("Image does not exist");

    return image

  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}

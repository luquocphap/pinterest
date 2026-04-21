import { BadRequestException, Injectable } from '@nestjs/common';
import { SaveDto } from './dto/save.dto';
import prismaConfig from 'prisma.config';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class SavingsService {
    constructor(private prisma: PrismaService) {}
    async saveImage(body: SaveDto, user: any){
        const { id } = user;

        const image = await this.prisma.images.findUnique({
            where: {
                id: body.imageId
            }
        });

        if (!image) throw new BadRequestException("Image does not exist");

        await this.prisma.savings.create({
            data: {
                imageId: body.imageId,
                userId: id
            }
        })

        return true;
    }

    async checkSaving(imageId: number, user: any){
        const { id } = user;
        const image = await this.prisma.images.findUnique({
            where: {
                id: imageId
            }
        });

        if (!image) throw new BadRequestException("Image does not exist");

        const checkSaving = await this.prisma.savings.findUnique({
            where: {
                userId_imageId: {
                    userId: id,
                    imageId: imageId
                }
            }
        });

        if (!checkSaving) return false;

        return true;
    }
}

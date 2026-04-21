import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { identity } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  async update(user: any, updateUserDto: UpdateUserDto) {
    const { id } = user;
    const userExist = await this.prisma.users.findUnique({
      where: {
        id: id
      }
    });

    if (!userExist) throw new BadRequestException("User does not exist");

    await this.prisma.users.update({
      where: {
        id: id
      },

      data: {
        ...(updateUserDto.email !== undefined && { email: updateUserDto.email }),
        ...(updateUserDto.fullName !== undefined && { fullName: updateUserDto.fullName }),
        ...(updateUserDto.age  !== undefined && { age: updateUserDto.age }) 
      }
    })
    return true;
  }

  async getSavedImages(user: any){
    const { id } = user;
    const userExist = await this.prisma.users.findUnique({
      where: {
        id: id
      }
    });

    if (!userExist) throw new BadRequestException("User does not exist");

    const savedImages = await this.prisma.savings.findMany({
      where: {
        userId: id
      }
    });

    return savedImages;
  }

  async getCreatedImages(user: any){
    const { id } = user;
    
    const userExist = await this.prisma.users.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!userExist) throw new BadRequestException("User does not exist");

    const createdImages = this.prisma.images.findMany({
      where: {
        userId: Number(id)
      }
    })

    return createdImages
  }
  
}

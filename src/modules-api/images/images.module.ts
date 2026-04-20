import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { CloudinaryModule } from 'src/modules-system/cloudinary/cloudinary.module';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [CloudinaryModule]
})
export class ImagesModule {}

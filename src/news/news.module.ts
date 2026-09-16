import { Module } from '@nestjs/common';
import { NewsController } from './news.controller.js';
import { NewsService } from './news.service.js';
import { PrismaService } from '../prisma.service.js';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';

@Module({
  controllers: [NewsController],
  providers: [NewsService,PrismaService,CloudinaryService]
})
export class NewsModule {}

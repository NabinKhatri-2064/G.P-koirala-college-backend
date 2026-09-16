import { Module } from '@nestjs/common';
import { FeaturednewsController } from './featurednews.controller.js';
import { FeaturednewsService } from './featurednews.service.js';
import { PrismaService } from '../prisma.service.js';
import { CloudinaryModule } from '../cloudinary/cloudinary.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [CloudinaryModule,AuthModule],
  controllers: [FeaturednewsController],
  providers: [FeaturednewsService, PrismaService]
})
export class FeaturednewsModule {}

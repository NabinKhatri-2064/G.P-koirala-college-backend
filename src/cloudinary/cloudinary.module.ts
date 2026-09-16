import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service.js';
import { CloudinaryProvider } from './cloudinary.js';

@Module({
  providers: [CloudinaryService,CloudinaryProvider],
  exports: [CloudinaryProvider,CloudinaryService]
})
export class CloudinaryModule {}

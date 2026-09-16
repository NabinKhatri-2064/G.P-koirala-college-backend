import { Module } from '@nestjs/common';
import { EnquiryController } from './enquiry.controller.js';
import { EnquiryService } from './enquiry.service.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [EnquiryController],
  providers: [EnquiryService,PrismaService]
})
export class EnquiryModule {}

import { Module } from '@nestjs/common';
import { AdmissionController } from './admission.controller.js';
import { AdmissionService } from './admission.service.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [AdmissionController],
  providers: [AdmissionService,PrismaService]
})
export class AdmissionModule {}

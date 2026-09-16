import { Module } from '@nestjs/common';
import { AdminGuard } from './admin.guard.js';
import { PrismaService } from '../prisma.service.js';
import { JwtModule } from '@nestjs/jwt';
import { AdminService } from './admin.service.js';
import { AdminController } from './admin.controller.js';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: "1h"}
  })],
  providers: [AdminGuard,PrismaService,AdminService],
  controllers: [AdminController],
  exports: [AdminService]

})
export class AdminModule {}

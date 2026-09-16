import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PrismaService } from "./prisma.service";
import { ConfigModule } from "@nestjs/config";
import { AdmissionModule } from "./admission/admission.module.js";
import { AdminController } from "./admin/admin.controller.js";
import { AdminModule } from "./admin/admin.module.js";
import { CloudinaryModule } from "./cloudinary/cloudinary.module.js";
import { FeaturednewsModule } from "./featurednews/featurednews.module.js";
import { AuthModule } from "./auth/auth.module.js";
import { EnquiryModule } from "./enquiry/enquiry.module.js";
import { NewsModule } from "./news/news.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdmissionModule,
    AdminModule,
    CloudinaryModule,
    FeaturednewsModule,
    AuthModule,
    EnquiryModule,
    NewsModule,
  ],
  controllers: [AppController, AdminController],
  providers: [PrismaService],
})
export class AppModule {}

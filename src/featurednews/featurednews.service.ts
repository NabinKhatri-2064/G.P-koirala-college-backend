import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import type { featurednewsdto } from "./featurednewsdto/featurednews.dto";

@Injectable()
export class FeaturednewsService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(CloudinaryService) private readonly cloudinary: CloudinaryService,
  ) {}

  async UploadFeaturedNewsData(
    featurednews: featurednewsdto,
    image: Express.Multer.File,
  ) {
    try {
      if (!featurednews || !image) {
        throw new BadRequestException(
          "Image and Featured news data are mandatory!",
        );
      }

      const uploadedimage = await this.cloudinary.uploadImage(
        image,
        "gpkmc/featurednews",
      );

      const data = {
        image: uploadedimage.secure_url,
        ...featurednews,
      };

      const result =
        await this.prisma.db.orm.public.addfeaturednews.create(data);

      return result;
    } catch (error) {
      throw error;
    }
  }



  async getFeaturednews ()
  {
    try {
      const featurednews = await this.prisma.db.orm.public.addfeaturednews.all();
      return featurednews
    } catch (error) {

      throw new InternalServerErrorException("Internal server Error!  ")
      
    }
  }
}

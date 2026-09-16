import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import type { newsdto } from "./newsdto/news.dto";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Injectable()
export class NewsService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(CloudinaryService) private readonly cloudinary: CloudinaryService,
  ) {}

  async addnews(news: newsdto, image: Express.Multer.File) {
    try {
      if (!news) {
        throw new Error("News not provided");
      }

      const uploadedimage = await this.cloudinary.uploadImage(
        image,
        "gpkmc/news",
      );

      const data = {
        image: uploadedimage.secure_url,
        ...news,
      };

      const add_news = await this.prisma.db.orm.public.News.create(data);

      if (!add_news) {
        throw new Error("Error while fetching News");
      }

      return add_news;
    } catch (error) {
      throw new InternalServerErrorException("Internal Server Error");
    }
  }

  async getnews() {
    try {
      const news = await this.prisma.db.orm.public.News.orderBy((a) =>
        a.createdAt.desc(),
      ).all();

      return {
        news : news
      };
    } catch (error) {
      throw new InternalServerErrorException("Internal Server Error");
    }
  }
}

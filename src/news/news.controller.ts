import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { NewsService } from "./news.service";
import type { newsdto } from "./newsdto/news.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Roles } from "../custom/decorators/roles.decorator";
import { authguard } from "../auth/auth.guard";
import { roleguard } from "../auth/roles.guard";

@Controller("news")
export class NewsController {
  constructor(@Inject(NewsService) private readonly news: NewsService) {}

  @Roles("ADMIN")
  @UseGuards(authguard, roleguard)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  async addnews(
    @Body() news: newsdto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!news) {
      throw new Error("News Fields cannot be empty");
    }
    const result = await this.news.addnews(news, image);
    console.log(news, image);
    return result;
  }

  @Get()
  async getnews() {
    const News = this.news.getnews();
    if (!News) {
      throw new Error("News not found!");
    }

    return News;
  }
}

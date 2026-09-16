import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FeaturednewsService } from "./featurednews.service";
import { featurednewsdto } from "./featurednewsdto/featurednews.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Roles } from "../custom/decorators/roles.decorator";
import { authguard } from "../auth/auth.guard";
import { roleguard } from "../auth/roles.guard";

@Controller("featurednews")
export class FeaturednewsController {
  constructor(
    @Inject(FeaturednewsService)
    private readonly featurednews: FeaturednewsService,
  ) {}

  @Roles("ADMIN")
  @UseGuards(authguard, roleguard)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  async addfeaturednews(
    @Body() featurednews: featurednewsdto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.featurednews.UploadFeaturedNewsData(featurednews, image);
  }

  @Get()
  async getfeaturednews() {
    const featurednews = await  this.featurednews.getFeaturednews();
    return featurednews
  }
}

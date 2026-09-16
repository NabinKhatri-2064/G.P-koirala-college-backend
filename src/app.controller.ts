import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "./custom/decorators/roles.decorator";
import { authguard } from "./auth/auth.guard";
import { roleguard } from "./auth/roles.guard";

@Controller()
export class AppController {
  @Roles("ADMIN")
  @UseGuards(authguard,roleguard)
  @Get()
  getRoot() {
    return {
      message: "hello from create-prisma + nest",
    };
  }
}

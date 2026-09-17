import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import type { admindto } from "./admindto/admin.dto";
import { authguard } from "../auth/auth.guard";
import { roleguard } from "../auth/roles.guard";
import { Roles } from "../custom/decorators/roles.decorator";
import type { Request } from "express";

type AuthenticatedRequest = Request & {
  user: {
    sub: number;
    username: string;
    role: string;
  };
};

@Controller("admin")
export class AdminController {
  constructor(@Inject(AdminService) private readonly admin: AdminService) {}

  @Post("/login")
  async login(@Body() admincredentials: admindto) {
    const token = await this.admin.adminlogin(admincredentials);

    return {
      message: "Login Successfully",
      access_token: token.access_token,
    };
  }

  @Get("/verify")
  @UseGuards(authguard)
  verifyAdmin(@Req() request: AuthenticatedRequest) {
    return request.user;
  }
}

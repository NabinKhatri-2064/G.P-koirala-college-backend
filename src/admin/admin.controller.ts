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
import type { Request, Response } from "express";

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
  async login(
    @Body() admincredentials: admindto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.admin.adminlogin(admincredentials);

    response.cookie("access_token", token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    return {
      message: "Login Successfully",
    };
  }

  @Get("/verify")
  @Roles("ADMIN")
  @UseGuards(authguard, roleguard)
  verifyAdmin(@Req() request: AuthenticatedRequest) {
    return this.admin.verifyAdmin(request.user);
  }
}

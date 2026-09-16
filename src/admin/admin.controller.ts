import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { AdminService } from "./admin.service";
import type { admindto } from "./admindto/admin.dto";
import {  type Response } from "express";

@Controller("admin")
export class AdminController {
  constructor(@Inject(AdminService) private readonly admin: AdminService) {}

  @Post("/login")
  async login(@Body() admincredentials: admindto , @Res({passthrough: true}) response:Response) {
    console.log(admincredentials);
    const token = await this.admin.adminlogin(admincredentials);

        const res = response.cookie("access_token", token.access_token, {
        httpOnly: true,
        secure: true  ,
        sameSite: "none",
        maxAge: 15 * 60 * 1000,
        });


        return {
        message: "Login Successfully",
        };
    }
    }

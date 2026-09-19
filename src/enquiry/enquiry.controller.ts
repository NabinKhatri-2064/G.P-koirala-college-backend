import { Controller, Delete, Get, Inject, Param, UseGuards } from "@nestjs/common";
import { EnquiryService } from "./enquiry.service";
import { Roles } from "../custom/decorators/roles.decorator";
import { authguard } from "../auth/auth.guard";
import { roleguard } from "../auth/roles.guard";
import { string } from "@prisma/composer";

@Controller("enquiry")
export class EnquiryController {
  constructor(
    @Inject(EnquiryService) private readonly enquiry: EnquiryService,
  ) {}

  @Roles("ADMIN")
  @UseGuards(authguard, roleguard)
  @Get()
  getmessagelength() {
    return this.enquiry.enquirymessagelength();
  }

  @Roles("ADMIN")
  @UseGuards(authguard, roleguard)
  @Get("/message")
  getmessage() {
    return this.enquiry.enquirymessage();
  }



  @Roles("ADMIN")
  @UseGuards(authguard,roleguard)
  @Delete(":id")
  async deleteenquiry(@Param("id") id:string ){
    return this.enquiry.deleteenquirymessage(Number(id))
  }
}

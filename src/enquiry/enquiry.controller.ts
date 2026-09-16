import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { EnquiryService } from "./enquiry.service";
import { Roles } from "../custom/decorators/roles.decorator";
import { authguard } from "../auth/auth.guard";
import { roleguard } from "../auth/roles.guard";

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
}

import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class EnquiryService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async enquirymessagelength() {
    const message = (await this.prisma.db.orm.public.admissionform.all())
      .length;
    return {
      length: message,
    };
  }
  async enquirymessage() {
    const message = await this.prisma.db.orm.public.admissionform
      .orderBy((a) => a.createdAt.desc())
      .all();
    return message;
  }
}

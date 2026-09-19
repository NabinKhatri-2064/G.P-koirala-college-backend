import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class EnquiryService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  // RETURNS THE LENGTH OF THE ENQUIRIES
  async enquirymessagelength() {
    const message = (await this.prisma.db.orm.public.admissionform.all())
      .length;
    return {
      length: message,
    };
  }

  // RETURNS THE ACTUAL ENQUIRIES
  async enquirymessage() {
    const message = await this.prisma.db.orm.public.admissionform
      .orderBy((a) => a.createdAt.desc())
      .all();
    return message;
  }

  // HANDLES DELETING THE ENQUIRIES

  async deleteenquirymessage(id: number) {
    const deleteenquiry = await this.prisma.db.orm.public.admissionform
      .where({ id })
      .delete();

    return {
      message: "User deleted successfully",
    };
  }
}

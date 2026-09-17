import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import bcrypt from "bcrypt";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";
import type { admindto } from "./admindto/admin.dto";

@Injectable()
export class AdminService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(JwtService) private readonly jwt: JwtService,
  ) {}

  async adminlogin(admincredentials: admindto) {
    if (!admincredentials) {
      throw new Error("Admin credentials not provided!");
    }

    const user = await this.prisma.db.orm.public.User.where({
      username: admincredentials.username,
    }).first();

    if (!user) {
      throw new UnauthorizedException(
        "Sorry the provided credentials are wrong!",
      );
    }

    const checkpassword = await bcrypt.compare(
      admincredentials.password,
      user.password,
    );

    if (!checkpassword) {
      throw new UnauthorizedException(
        "Sorry the provided credentials are wrong!",
      );
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }

  async verifyAdmin(user: {
    sub: number;
    username: string;
    role: string;
  }) {
    const admin = await this.prisma.db.orm.public.User.where({
      id: user.sub,
    }).first();

    if (!admin || admin.role !== "ADMIN") {
      throw new UnauthorizedException("Admin account is not valid");
    }

    return {
      sub: admin.id,
      username: admin.username,
      role: admin.role,
    };
  }
}

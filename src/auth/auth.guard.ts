import {
  type CanActivate,
  type ExecutionContext,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { NotFoundError, Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class authguard implements CanActivate {
  constructor(@Inject(JwtService) private readonly jwt: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.access_token;

    if (!token) {
      throw new NotFoundException("Token not found");
    }
    
    try {
      const payload =  this.jwt.verify(token,{
        secret: process.env.JWT_SECRET
      });
      request.user = payload;
    } catch (error) {
      console.log("JWT VERIFY ERROR:", error);
      throw new UnauthorizedException("Invalid token");
    }

    return true;
  }
}

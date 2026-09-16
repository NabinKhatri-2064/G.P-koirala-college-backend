import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Inject,
} from "@nestjs/common";

import { Reflector } from "@nestjs/core";

import { Observable } from "rxjs";

@Injectable()
export class roleguard implements CanActivate {
  constructor(@Inject(Reflector) private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const requiredrole = this.reflector.get(
      "roles",
      context.getHandler(),
    );

    if (!requiredrole) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("User not authenticated");
    }

    const hasrole = requiredrole.includes(user.role);

    if (!hasrole) {
      throw new ForbiddenException("Forbidden access");
    }

    return true;
  }
}
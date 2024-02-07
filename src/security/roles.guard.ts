import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let canActivate = false;
    const requiredRoles: [][] = this.reflector
      .getAll(ROLES_KEY, [context.getHandler(), context.getClass()])
      .filter((element) => element !== undefined);

    if (requiredRoles && requiredRoles.length > 0) {
      const user: User = context.switchToHttp().getRequest().user;
      if (user && user.role) {
        canActivate = requiredRoles.every((anyOfRoles) =>
          anyOfRoles.some((role) => role === user.role),
        );
      }
    } else {
      canActivate = true;
    }

    return canActivate;
  }
}

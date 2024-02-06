import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SecurityService } from './security.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private securityService: SecurityService) {}
  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Please provide token');
      }
      const authToken = authorization.replace(/bearer/gim, '').trim();
      const resp = await this.securityService.verify(
        authToken,
        process.env.JWT_SECRET,
      );
      request.decodedData = resp;
      return true;
    } catch (error) {
      console.log('auth error - ', error.message);
      return false;
    }
  }
}

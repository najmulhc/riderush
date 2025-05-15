import { UserService } from './../user/user.service';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  configModule: ConfigService;
  jwtModule: JwtService;
userService : UserService
  constructor(config: ConfigService, jwt: JwtService , userServiceRepo: UserService) {
    (this.configModule = config), (this.jwtModule = jwt) , (this.userService = userServiceRepo);
  }
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization.split(' ')[1];

    if (!token) {
      throw new BadRequestException('No token given');
    }
    try {
      const decoded = await this.jwtModule.verifyAsync(token, {
        secret: this.configModule.get('JWT_SECRET'),
      });

      if (!decoded) {
        throw new UnauthorizedException(
          'Invalid token given, your token might be outdated.',
        );
      }
      request.user = await this.userService.findUserById(decoded.user_id);
 
      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

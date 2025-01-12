/* eslint-disable prettier/prettier */

import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { AllConfigTypes } from 'src/config/config.types';
import { IS_PUBLIC_KEY } from '../../utils/decorators/auth.decorator';
import { SessionService } from 'src/session/session.service';
import { UsersService } from 'src/User/users.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private readonly configService: ConfigService<AllConfigTypes>,
        private readonly sessionService : SessionService,
        private readonly userService : UsersService,
        private readonly reflector: Reflector
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
          if (isPublic) {
            // 💡 See this condition
            return true;
          }
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: this.configService.getOrThrow('auth.secret', { infer: true })
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        const session = await this.sessionService.findOneOrNull(payload.sessionId);
        if(!session){
          throw new UnauthorizedException();
        }
        const user = await this.userService.findOneOrNUll(session.userId);
        request['user'] = user;
      } catch(error) {
        console.error(error)
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  
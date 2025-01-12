/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './authentication.controller';
import { AuthencticationService } from './authentication.service';
import { Authentication } from './entities/authentication.entity';
import { UserModule } from 'src/User/users.module';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/User/entities/user.entity';
import { SessionService } from 'src/session/session.service';
import { SessionModule } from 'src/session/session.module';
import { Session } from 'src/session/entities/session.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  imports:[TypeOrmModule.forFeature([Authentication]),
  TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([Session]),
  forwardRef(() => UserModule),
  SessionModule],
  controllers: [AuthController],
  providers: [AuthencticationService,JwtService,SessionService,{provide:'APP_GUARD',useClass:AuthGuard}],
  exports:[AuthencticationService]
})
export class AuthenticationModule {}

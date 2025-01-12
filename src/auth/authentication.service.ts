/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AllConfigTypes } from 'src/config/config.types';
import { Session } from 'src/session/entities/session.entity';
import { User } from 'src/User/entities/user.entity';
import { TokenType } from './enum/token.type.enum';
import { UserLoginDTO } from 'src/User/dto/User.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authentication } from './entities/authentication.entity';
import { comparePassword } from 'src/utils/common.utils';
import { SessionService } from 'src/session/session.service';
import * as ms from 'ms';

interface TokenResponse{
    token: string;
    refreshToken: string;
    tokenExpires: number;
}

@Injectable()
export class AuthencticationService{

  constructor(
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService<AllConfigTypes>, 
      @InjectRepository(User) 
      private readonly userRepository: Repository<User>,
      @InjectRepository(Authentication)
      private readonly authRepository: Repository<Authentication>,
      private readonly sessionService : SessionService
  ){}

  async loginValidator(logindto:UserLoginDTO) : Promise <any|null>{
    let user, auth
    try{
        user = await this.userRepository.findOneBy({email: logindto.email});
        auth = await this.authRepository.findOneBy({username: logindto.email})
    }catch(error){
        console.error("Unable to process request",error.message);
        throw new BadRequestException("Kindly try again later")
    }

    if (!user || !auth || !(await comparePassword(logindto.password,auth.password))) {
        throw new UnprocessableEntityException('Invalid email or password')
      };
        
    const  session = await this.sessionService.create(user);
    // create new token with this session
    const token =  await this.getTokensData({id: user.id,sessionId:session.id,role:auth.role});

    //return response
      return {token,user};
    }

  async logout(user:string):Promise<string>{
    return this.sessionService.delete(user)
  }

  async getTokensData(data: {
  id: User['id'];
  role: Authentication['role'];
  sessionId: Session['id']} ):Promise<TokenResponse> {
  const tokenExpiresIn = this.configService.getOrThrow('auth.expires',{infer:true});

  const tokenExpires = Date.now() + ms(tokenExpiresIn);
  const [token, refreshToken] = await Promise.all(
      [await this.jwtService.signAsync({
        id: data.id,
        role: data.role,
        sessionId: data.sessionId,
        type: TokenType.ACCESS,
      },
      {
        secret: this.configService.getOrThrow('auth.secret', { infer: true }),
        expiresIn: tokenExpiresIn,
      },
    ),
    await this.jwtService.signAsync(
      {
        id: data.id,
        role: data.role,
        sessionId: data.sessionId,
        type: TokenType.REFRESH,
      },
      {
        secret: this.configService.getOrThrow('auth.refreshSecret', {
          infer: true,
        }),
        expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
          infer: true,
        }),
      },
    ),
  ]);

  return {
    token,
    refreshToken,
    tokenExpires,
  };
}

}

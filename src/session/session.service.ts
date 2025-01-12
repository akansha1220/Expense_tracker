/* eslint-disable prettier/prettier */
import { BadGatewayException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Session } from './entities/session.entity'
import { Repository } from "typeorm";
import { User } from "src/User/entities/user.entity";

@Injectable()

export class SessionService{

    constructor(@InjectRepository(Session) 
    private readonly sessionRepository: Repository<Session> ){}

    async create(user:User):Promise<Session>{
        const newsession = await this.sessionRepository.create({userId:user.id})
        return await this.sessionRepository.save(newsession);
    }

    async delete(id:string):Promise<string>{  
        const existingSession = await this.sessionRepository.findOneBy({id});
    
        if (!existingSession) {
        throw new BadGatewayException('invalid logout request');
        }
        
        this.sessionRepository.softDelete(existingSession);
        return "logout successfuly";
    }

    async findOneOrNull(id:string){
        return await this.sessionRepository.findOneBy({id});
    }
}
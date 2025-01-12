/* eslint-disable prettier/prettier */
import {  Injectable,UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './entities/user.entity';
import { CreateUserDTO } from "./dto/User.dto";
import { Authentication } from "src/auth/entities/authentication.entity";
import {hashPassword} from 'src/utils/common.utils'
import { Role } from "src/auth/enum/role.enum";

@Injectable()

export class UsersService{
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        @InjectRepository(Authentication) 
        private readonly authRepository: Repository<Authentication>
    ){}

    async findUserByEmail(email:string): Promise<User> {
        const user = await this.userRepository.findOneBy({email});
        return user;
    }

async signup(newUser:CreateUserDTO) : Promise <User>{
    const {email,password,name,phone}=newUser;

    const hashedPassword = await hashPassword(password)
    const newauth = await this.authRepository.create({
        password:hashedPassword,
        role:Role.USER,
        username:email,
        lastPassword:[hashedPassword],
    })
    
    const auth = await this.authRepository.save(newauth);
    const newuser =  this.userRepository.create({
        email,
        name,
        phone,
        authId:auth.id,
    });
    return await this.userRepository.save(newuser);
    }

  

async findOne(email: string):Promise<User> {
    const user = await this.userRepository.findOne({ where: { email} });
    if (!user) {
        throw new UnauthorizedException('This email is already in use');
    }    
    return user;
}

    async GetAllUsers():Promise<User[]>{
        return this.userRepository.find()
    }

    async deleteuser(name: string):Promise<any> {
        const user = await this.userRepository.findOne({ where: { name} });
        if (!user) {
            throw new UnauthorizedException('This user is not exist');
        }    
        this.userRepository.delete(user);

        return {message :"User Deleted successfully"}
    } 
    
 async findOneOrNUll(id:string){
    return await this.userRepository.findOneBy({id});
 }
}
/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MinLength, IsPhoneNumber } from 'class-validator';
import { Role } from 'src/auth/enum/role.enum';


export class UserLoginDTO{

    @IsEmail()
    @IsNotEmpty()
    email:string;
    
    @MinLength(8)
    @IsNotEmpty()
    password : string;
}

export class CreateUserDTO{
    @IsNotEmpty()
    @IsEmail()
    email:string;
    
    
    @IsNotEmpty()
    @MinLength(8)
    password : string;

    @IsNotEmpty()
    name: string;

    @IsPhoneNumber('IN')
    phone:string;

   // @IsEnum(Role,{message:'write a valid role'})
    role:Role.USER;

}



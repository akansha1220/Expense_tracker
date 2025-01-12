/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UsersService } from 'src/User/users.service';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class userExistValidator implements ValidatorConstraintInterface{
    constructor(private readonly userService:UsersService){}
    async validate(email:string):Promise<boolean>{
        const user = this.userService.findUserByEmail(email)
        return (user)? true:false;
}
}
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { userExistValidator } from './user_exist.validator';
import { UserModule } from 'src/User/users.module';

@Module({
    imports:[UserModule],
    providers: [userExistValidator],
})
export class UserValidateModule {}
/* eslint-disable prettier/prettier */
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/User/entities/user.entity';
import { UsersService } from "./users.service"
import { Authentication } from "src/auth/entities/authentication.entity";
import { UsersController } from "./users.controller";


@Module({
    imports:[TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Authentication]),
    forwardRef(() => Authentication) ],
    providers:[ UsersService ],
    controllers:[UsersController],
    exports: [UsersService]
})

export class UserModule{}
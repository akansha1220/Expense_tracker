/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService} from './database/typeorm-config.service';
import appConfig  from './config/app.config';
import databaseConfig from './config/database.config';
import { UserModule } from './User/users.module';
import { AuthenticationModule } from './auth/authentication.module';
import authConfig from './config/auth.config';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports:[ConfigModule.forRoot({
    isGlobal:true,
    load: [
      appConfig,
      databaseConfig,
      authConfig,
    ]
  }),
  TypeOrmModule.forRootAsync({
    useClass:TypeOrmConfigService
  }),
    UserModule,
    ExpenseModule,
    AuthenticationModule,
  ],
  })
  
export class AppModule {}

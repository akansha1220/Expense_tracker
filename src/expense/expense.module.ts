/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseService } from "./expense.service";
import { ExpenseController } from "./expense.controller";
import { Expense } from "./entities/expense.entity";
import { AuthenticationModule } from "src/auth/authentication.module";



@Module({
    imports:[
    TypeOrmModule.forFeature([Expense]),AuthenticationModule],
    providers:[ ExpenseService ],
    controllers:[ExpenseController],
    exports: [ExpenseService]
})

export class ExpenseModule{}
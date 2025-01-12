/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { ExpenseType } from "../enum/expense-type.enum";

export class ExpenseDTO{
        
    @IsEnum(ExpenseType)
    type: ExpenseType;

    @IsNotEmpty()
    amount : number;

    @IsNotEmpty()
    expenseDate : Date;

}

export class UpdateExpenseDTO{
        
    @IsEnum(ExpenseType,{message:'enter the right category of expense'})
    @IsOptional()
    type: ExpenseType;

    @IsOptional()
    amount : number;

    @IsOptional()
    expenseDate : Date;

}


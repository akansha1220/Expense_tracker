/* eslint-disable prettier/prettier */
import { Column,  } from "typeorm";
import { CreateDateColumn } from "typeorm/decorator/columns/CreateDateColumn";
import { DeleteDateColumn } from "typeorm/decorator/columns/DeleteDateColumn";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { UpdateDateColumn } from "typeorm/decorator/columns/UpdateDateColumn";
import { Entity } from "typeorm/decorator/entity/Entity";
import { ExpenseType } from "../enum/expense-type.enum";
//import { join } from "path";

@Entity('expense')
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'uuid',name:"user_id",nullable:false})
    userId:string;

    @Column({type:'enum',name:'type',enum:ExpenseType})
    type : ExpenseType;

    @Column({type: 'integer',name:'expenditure'})
    amount : number;

    @Column({type:'date',name:"expense_date",nullable:false})
    expenseDate:Date;

    @CreateDateColumn({name:"created_at"})
    createdAt:Date;

    @UpdateDateColumn({name:"updated_at"})
    updatedAt: Date;

    @DeleteDateColumn({name:"deleted_at"})
    deletedAt: Date;

    
}
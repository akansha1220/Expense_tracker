/* eslint-disable prettier/prettier */
import { IsEmail } from 'class-validator';
import { Authentication } from 'src/auth/entities/authentication.entity';
import { Expense } from 'src/expense/entities/expense.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity,  OneToMany,  OneToOne, PrimaryGeneratedColumn, UpdateDateColumn  } from 'typeorm' ;



@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Column({name:'name',type:"varchar",length: 128,nullable:false})
    name: string;

    @Column({unique:true})
    @IsEmail()
    email : string;

    @Column({type:'varchar',width:10})
    phone: string;

    @CreateDateColumn({name:"createdAt",})
    createdAt:Date

    @UpdateDateColumn({name:"updatedAt"})
    updatedAt:Date

    @DeleteDateColumn({name:"deletedAt"})
    deletedAt:Date

    @Column({type:'uuid',name:"auth_id"})
    authId:string;

    @OneToOne(()=> Authentication,(Authentication)=>Authentication.id)
    auth:Authentication ;

    @OneToMany(() => Expense, (expense) => expense.userId)
    expenses: Expense[];
    
}
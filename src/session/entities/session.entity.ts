/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, DeleteDateColumn, Entity,   PrimaryGeneratedColumn } from "typeorm";

@Entity('session')
export class Session {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({name:"user_id",type:"uuid",nullable:false})
    userId:string;

    @CreateDateColumn({name:"created_at"})
    createdAt:Date;

    @DeleteDateColumn({name:"deleted_at"})
    deletedAt: Date;

    
}
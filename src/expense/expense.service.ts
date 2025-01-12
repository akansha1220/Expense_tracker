/* eslint-disable prettier/prettier */
import {  Injectable,NotFoundException } from "@nestjs/common";
import { FindManyOptions, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Expense } from "./entities/expense.entity";
import { ExpenseDTO, UpdateExpenseDTO } from "./dto/expense.dto";
import { IPaginationOptions } from "src/utils/interface/paging.interface";
import { User } from "src/User/entities/user.entity";

@Injectable()

export class ExpenseService{
    constructor(
        @InjectRepository(Expense) 
        private readonly expenseRepository: Repository<Expense>
    ){}

async addExpense( expenseDTO:ExpenseDTO,user:User): Promise<Expense> {

    const expense = this.expenseRepository.create({...expenseDTO,userId:user.id})
    return await this.expenseRepository.save(expense);
    }

    async edit(id,user:User,updateExpenseDTO:UpdateExpenseDTO) : Promise <Expense>{
        const expense = await this.expenseRepository.findOne({where:{id,userId:user.id}})

        if(!expense){
            throw new NotFoundException(`this expense not found`);
        }

        return this.expenseRepository.save(
            this.expenseRepository.merge(expense,updateExpenseDTO)
        );
    }


    async deleteExpense(id: string):Promise<any> {
        const expense = await this.expenseRepository.findOne({ where: { id} });
        if (!expense) {
            throw new NotFoundException('This expense is not exist');
        }    
        this.expenseRepository.delete(expense);

        return {message :"Expense Deleted successfully"}
    }

    // async getExpense():Promise<Expense>{
    //     const allExpense = await this.expenseRepository.find({where:{}})
    // }

    findManyWithPagination(
        paginationOptions: IPaginationOptions,
        options?: FindManyOptions<Expense>,
      ): Promise<Expense[]> {
        return this.expenseRepository.find({
          skip: (paginationOptions.page - 1) * paginationOptions.limit,
          take: paginationOptions.limit,
          ...options,
        });
      }

    async getStats(filter: string,user: User, startDate?: string, endDate?: string) {
        let whereCondition = 'expense.userId = :userId';
        const queryParams: Record<string, any> = { userId: user.id };
      
        switch (filter) {
          case 'today': {
            const today = new Date().toISOString().split('T')[0];
            whereCondition += ' AND expense.expenseDate = :today';
            queryParams.today = today;
            break;
          }
          case 'month': {
            const now = new Date();
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
            const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
            whereCondition += ' AND expense.expenseDate BETWEEN :monthStart AND :monthEnd';
            queryParams.monthStart = monthStart;
            queryParams.monthEnd = monthEnd;
            break;
          }
          case 'all': {
            // No additional conditions needed
            break;
          }
          case 'custom': {
            if (!startDate || !endDate) {
              throw new Error('Invalid custom range provided');
            }
            whereCondition += ' AND expense.expenseDate BETWEEN :startDate AND :endDate';
            queryParams.startDate = startDate;
            queryParams.endDate = endDate;
            break;
          }
          default:
            throw new Error('Invalid filter provided');
        }
      
        return this.expenseRepository
          .createQueryBuilder('expense')
          .select('expense.type', 'type')
          .addSelect('SUM(expense.amount)', 'totalAmount')
          .where(whereCondition, queryParams)
          .groupBy('expense.type')
          .getRawMany();
      }
}
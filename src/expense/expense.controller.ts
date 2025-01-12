/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, DefaultValuePipe, Delete,  Get,  HttpCode,  HttpException,  HttpStatus,  Param, Patch, Post, Query, SerializeOptions, UseGuards } from "@nestjs/common";
import { Public } from "src/utils/decorators/auth.decorator";
import { ExpenseDTO, UpdateExpenseDTO } from "./dto/expense.dto";
import { ExpenseService } from "./expense.service";
import { ParseLimitPipe } from "src/utils/pipes/parseLimit.pipe";
import { ParsePagePipe } from "src/utils/pipes/validator.pipe";
import { ParseJsonPipe } from "src/utils/pipes/parseJson.pipe";
import { Expense } from "./entities/expense.entity";
import { InfinityPaginationResultType } from "src/utils/types/infinity-pagination-result";
import { infinityPagination } from "src/utils/infinity-pagination";
import { userExistValidator } from "src/utils/validators/user_exist.validator";
import { GetStatsDto } from "./dto/date.dto";
import { AuthenticatedUser } from "src/utils/decorators/authencated-user";
import { User } from "src/User/entities/user.entity";



@Controller({path:'expense',version:'1'})
export class ExpenseController{
    constructor(private expenseService: ExpenseService){}

    @Post()
    async create( 
        @AuthenticatedUser() user:User,
        @Body() values:ExpenseDTO){

         return this.expenseService.addExpense(values,user);
    }

    @Patch(':id')
    update(
      @Param('id') expenseId: string,
      @AuthenticatedUser() user:User,
     @Body() updateExpenseDTO: UpdateExpenseDTO
    ) {
    return this.expenseService.edit(expenseId,user,updateExpenseDTO );
    }

    @Delete(':id')
    delete(@Param('id') Id:string){
        return this.expenseService.deleteExpense(Id)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
        @AuthenticatedUser() user:User,
        @Query('page', ParsePagePipe) page: number,
        @Query('limit', ParseLimitPipe) limit: number,
        @Query('where', new DefaultValuePipe('{}'), ParseJsonPipe)
        whereFilter?: any,
        
  ): Promise<InfinityPaginationResultType<Expense>> {
    const whereConditions = { 
      ...whereFilter,
      userId:user.id  
    };
    try {
      return infinityPagination(
        await this.expenseService.findManyWithPagination(
          {
            page,
            limit,
          },
          {
            where: whereConditions,  
            loadEagerRelations: false,  
          }
        ),
        { page, limit },  
      );
    } catch (error) {
        console.log(error)
      throw new HttpException("Error while querying",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/stats')
  async getStats(
  @AuthenticatedUser() user:User,
  @Query('filter') filter: string,
  @Query('startDate') startDate?: string,
  @Query('endDate') endDate?: string) {
    return this.expenseService.getStats(filter,user, startDate, endDate);
  }

}



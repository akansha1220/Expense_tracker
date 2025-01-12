/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get,  Param, Post } from "@nestjs/common";
import { CreateUserDTO } from "./dto/User.dto";
import { UsersService } from "./users.service";
import { Public } from "src/utils/decorators/auth.decorator";


@Controller({
    path:'users',
    version:'1'
})
export class UsersController{

    constructor(private usersService: UsersService){}

    @Public()
    @Post('/signup')
    async createNewUser(@Body() values:CreateUserDTO){
         return this.usersService.signup(values);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
    }

   @Get()
   findAllUser() {
   return this.usersService.GetAllUsers();
   }
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateLibrarianDto: CreateUserDTO) {
    // return this.usersService.update(+id, updateLibrarianDto);
    // }

    @Delete(':name')
    DeleteUser(@Param('name') name:string){
        return this.usersService.deleteuser(name)
    }

}
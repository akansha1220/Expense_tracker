/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards, Patch, Param } from "@nestjs/common";
import { UserLoginDTO } from "src/User/dto/User.dto";
import { AuthencticationService } from "./authentication.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { Public } from "src/utils/decorators/auth.decorator";
import { AuthenticatedUser } from "src/utils/decorators/authencated-user";
import { User } from "src/User/entities/user.entity";



@Controller({
    path:'auth',
    version:'1'
})
export class AuthController{

    constructor(private readonly authService:AuthencticationService){}

    @Public()
    @Post('/login')
    async login(@Body() loginDTO:UserLoginDTO){
        return await this.authService.loginValidator(loginDTO); 
    }

    @UseGuards(AuthGuard)
    @Patch('logout/:id')
    async logout(@Param('id') id:string){
        return this.authService.logout(id);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@AuthenticatedUser() user:User) {
    return user
    }

}
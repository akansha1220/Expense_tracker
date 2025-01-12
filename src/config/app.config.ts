/* eslint-disable prettier/prettier */
import { registerAs } from "@nestjs/config";
import { AppConfig } from "./config.types";
import { validateConfig } from '../utils/validators/validate-config';
import { IsEnum, IsNotEmpty, IsNumber, Min,Max, IsString } from "class-validator";

enum Environment{
    Development = 'development',
    Production = 'production',
    Test = 'test'
}

export class EnvironmentVariableValidators {

    @IsEnum(Environment)
    @IsNotEmpty()
    APP_ENV:string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(65535)
    APP_PORT:number;

    @IsNotEmpty()
    APP_NAME:string;

    @IsString()
    @IsNotEmpty()
    APP_API_PREFIX:string;

    
}

export default registerAs<AppConfig>('app',() => {

    validateConfig(process.env,EnvironmentVariableValidators);

    return {
        nodeEnv: process.env.APP_ENV || 'production',
        port : parseInt(process.env.APP_PORT)  ,
        workingDirectory : process.env.PWD || process.cwd(),
        name : process.env.APP_NAME,
        apiPrefix : process.env.APP_API_PREFIX,

    }
})


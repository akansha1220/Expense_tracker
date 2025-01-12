/* eslint-disable prettier/prettier */
import { registerAs } from "@nestjs/config";
import { DatabaseConfig } from "./config.types";
import { validateConfig } from "src/utils/validators/validate-config";
import { IsNotEmpty, IsString, Min, MinLength,Max,IsInt, IsBoolean } from "class-validator";

export class EnvironmentVariableValidators{

    @IsString()
    @IsNotEmpty()
    TYPE:string;

    @IsString()
    @IsNotEmpty()
    HOST:string;

    @IsString()
    @IsNotEmpty()
    DATABASE_USERNAME:string;

    @IsString()
    @IsNotEmpty()
    DATABASE_NAME:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    DATABASE_PASSWORD:string;

    @Min(0)
    @Max(65535)
    @IsInt()
    @IsNotEmpty()
    DATABASE_PORT:number;

    @IsString()
    DATABASE_SCHEMA:string;

    @IsBoolean()
    DATABASE_SYNCHRONIZE:boolean;

    @IsBoolean()
    DATABASE_SSLENABLED:boolean;

    @IsInt()
    @IsNotEmpty()
    DATABASE_POOLSIZE:number;

    @IsBoolean()
    DATABASE_REJECTUNAUTHORIZE:boolean;
}


export default registerAs<DatabaseConfig>('database',() => {

    validateConfig(process.env,EnvironmentVariableValidators)

    return{
    type : process.env.TYPE,
    host: process.env.HOST,
    name : process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT),
    schema: process.env.DATABASE_SCHEMA,
    synchronize: process.env.DATABASE_SYNCHRONIZE==='true',
    sslEnabled: process.env.DATABASE_SSLENABLED==='true',
    poolSize: parseInt(process.env.DATABASE_POOLSIZE),
    rejectUnauthorize: process.env.DATABASE_REJECTUNAUTHORIZE==='true',
    };
})
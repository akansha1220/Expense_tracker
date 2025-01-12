/* eslint-disable prettier/prettier */
import { registerAs } from "@nestjs/config";
import { IsNotEmpty, IsString } from "class-validator";
import { AuthConfig } from "src/config/config.types";
import { validateConfig } from "src/utils/validators/validate-config";

export class EnvironmentVariableValidators{
    @IsString()
    @IsNotEmpty()
    JWT_EXPIRE_TIME:string;

    @IsString()
    @IsNotEmpty()
    JWT_AUTH_SECRET:string;

    @IsString()
    @IsNotEmpty()
    JWT_REFRESH_SECRET:string;

    @IsString()
    @IsNotEmpty()
    JWT_REFRESH_EXPIRE:string;
}

export default registerAs<AuthConfig>('auth',() =>{

    validateConfig(process.env,EnvironmentVariableValidators);

    return {
    expires:process.env.JWT_EXPIRE_TIME,
    secret:process.env.JWT_AUTH_SECRET,
    refreshSecret:process.env.JWT_REFRESH_SECRET,
    refreshExpires:process.env.JWT_REFRESH_EXPIRE,
    }
})
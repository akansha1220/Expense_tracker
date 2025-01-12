/* eslint-disable prettier/prettier */
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';


export function validateConfig<T extends object>(
  env:Record<string,unknown>,
  validatorClass:ClassConstructor<T>,){
    const validatedConfig = plainToClass(validatorClass, env, { enableImplicitConversion: true });
    const errors = validateSync(validatedConfig, { whitelist: true });

    if (errors.length > 0) {
    throw new Error(
      `Environment validation failed:${errors.toString()}`); 
    }

    return validateConfig;

}
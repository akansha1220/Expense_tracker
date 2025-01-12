/* eslint-disable prettier/prettier */
import { registerDecorator, ValidationOptions } from 'class-validator';
import { userExistValidator } from '../validators/user_exist.validator';

export function UserExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'UserExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: userExistValidator,
    });
  };
}
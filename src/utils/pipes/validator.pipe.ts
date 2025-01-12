/* eslint-disable prettier/prettier */
import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ParsePagePipe implements PipeTransform<any> {
  transform(value: any): any {
    try {
      const parsedValue = parseInt(value, 10);

      if (isNaN(parsedValue) || parsedValue < 0) {
        // default page 
        return 1;
      } else {
        return parsedValue;
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // default page
      return 1;
    }
  }
}
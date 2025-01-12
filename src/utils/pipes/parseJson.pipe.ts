/* eslint-disable prettier/prettier */
import { PipeTransform, Injectable, BadRequestException, Logger } from '@nestjs/common';


@Injectable()
export class ParseJsonPipe implements PipeTransform<any> {
  private readonly logger = new Logger(ParseJsonPipe.name)
  transform(value: any): any {
    try {
      return JSON.parse(value);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Invalid JSON string');
    }
  }
}
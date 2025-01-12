/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { SessionService } from './session.service';

@Module({
  imports:[TypeOrmModule.forFeature([Session]) ],
  //: [BookController],
  providers: [SessionService],
  exports:[SessionService]
})
export class SessionModule {}

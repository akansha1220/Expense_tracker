/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/role.guard';


@Module({
    providers: [
        {
          provide: 'APP_GUARD',
          useClass: RolesGuard,
        },
      ],
}
)
export class AppModule {}

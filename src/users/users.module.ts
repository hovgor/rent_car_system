import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentHistoryModule } from 'src/rent-history/rent-history.module';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { UserService } from './users.service';

@Module({
  controllers: [UsersController],
  imports:[
    TypeOrmModule.forFeature([Users]),
    forwardRef(() => RentHistoryModule)
  ],
  providers: [UserService]
})
export class UsersModule {}

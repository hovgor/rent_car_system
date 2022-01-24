import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars } from 'src/cars/cars.entity';
import { CarsModule } from 'src/cars/cars.module';
import { RatesModule } from 'src/rates/rates.module';
import { RentHistoryController } from './rent-history.controller';
import { RantHistory } from './rent-history.entity';
import { RentHistoryService } from './rent-history.service';

@Module({
  controllers: [RentHistoryController],
  imports: [
    TypeOrmModule.forFeature([RantHistory]),
    forwardRef(() => CarsModule),
    forwardRef(() => RatesModule)
  ],
  providers: [RentHistoryService]
})
export class RentHistoryModule {}

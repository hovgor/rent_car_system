import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from 'src/cars/cars.module';
import { RatesModule } from 'src/rates/rates.module';
import { RentHistoryModule } from 'src/rent-history/rent-history.module';
import { ReservationController } from './reservation.controller';
import { Reservation } from './reservation.entity';
import { ReservationService } from './reservation.service';

@Module({
  controllers: [ReservationController],
  imports:[
    TypeOrmModule.forFeature([Reservation]),
    forwardRef(() => CarsModule),
    forwardRef(() => RatesModule),
    forwardRef(() => RentHistoryModule)
  ],
  providers:[ReservationService]
})
export class ReservationModule {}

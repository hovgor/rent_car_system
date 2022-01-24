import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CarsModule } from './cars/cars.module';
import { RatesModule } from './rates/rates.module';
import { ReservationModule } from './reservation/reservation.module';
import { Repository } from 'typeorm';
import { RentHistoryModule } from './rent-history/rent-history.module';
import ormconfig from '../ormconfig';
@Module({
  imports: [CarsModule, RatesModule, ReservationModule, TypeOrmModule.forRoot(ormconfig), RentHistoryModule],
  controllers: [],
  providers: [Repository],
})
export class AppModule {}

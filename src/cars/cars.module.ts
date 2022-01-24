import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Cars } from './cars.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CarsController],
  imports: [TypeOrmModule.forFeature([Cars])],
  providers: [CarsService],
  exports: [CarsService]
})
export class CarsModule {}

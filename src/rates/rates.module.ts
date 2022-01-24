import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatesController } from './rates.controller';
import { Rates } from './rates.entity';
import { RatesService } from './rates.service';

@Module({
  controllers: [RatesController],
  imports: [TypeOrmModule.forFeature([Rates])],
  providers: [RatesService],
  exports: [RatesService]
})
export class RatesModule {}

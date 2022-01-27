import { Body, Controller, Delete, forwardRef, Get, HttpStatus, Inject, Param, Post, Put, Res, UnprocessableEntityException } from '@nestjs/common';
import { Response } from 'express';
import { CarsService } from 'src/cars/cars.service';
import { RatesService } from 'src/rates/rates.service';
import { RentHistoryService } from 'src/rent-history/rent-history.service';
import { ReservationDto } from './dto/reservationDto';
import { ReservationService } from './reservation.service';

function addDays(date: Date, days: number) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

@Controller('reservation')
export class ReservationController {
        constructor(
            private readonly reservationService: ReservationService,
            @Inject(forwardRef(() => CarsService)) private readonly carsService: CarsService,
            @Inject(forwardRef(() => RatesService)) private readonly ratesService: RatesService,
            @Inject(forwardRef(() => RentHistoryService)) private readonly rentHistoryService: RentHistoryService
        ){}

        // create new reservation
        @Post('newReservation')
        async createNewReservation(@Res() res: Response, @Body() body: ReservationDto){
            try {
                let discountPercentage: number = 0;
                if(!body.daysCount){
                    throw " days count is undifand "
                }
                if(body.daysCount <= 5){
                    discountPercentage = 5;
                }
                if(body.daysCount > 5 && body.daysCount <= 10){
                    discountPercentage = 10;
                }
                if(body.daysCount > 10){
                    discountPercentage = 25;
                }
                
                const getCarForRent = await this.carsService.findOne(body.carId);
                const getRatesForRent = await this.ratesService.getOneRates(body.ratesId);
                
                if(!getRatesForRent?.id){
                    throw " rates id undifande "
                }
                
                if(!body.carId){
                    throw " id is undefined!!! "
                }
                
                if(getCarForRent?.status !== "free"){
                    throw "you can't rent this car , car is busy or cleaning";
                }

                let reservationPrice: number = +(getRatesForRent.tariffPrice) - (+(getRatesForRent.tariffPrice) * discountPercentage / 100);
                

               const date = addDays(body.startRantDay,body.daysCount);
                
                const createReservation = await this.reservationService.createReservation({
                    carId: body.carId,
                    ratesId: body.ratesId,
                    daysCount: body.daysCount,
                    price: +(reservationPrice) * + (body.daysCount),
                    startRantDay: body.startRantDay,
                    endRantDay: date
                });
                const data = {
                    status: "busy"
                }
                await this.carsService.updateCar(body.carId, data);
                
                return res.status(HttpStatus.OK).json(createReservation);

            } catch (error) {
                throw new UnprocessableEntityException(error);
            }
        }

        // delete reservation by id
        @Delete('deleteReservation/:id')
        async deleteReservationById(@Res() res: Response, @Param() id: string){
            try {
                await this.reservationService.deleteReservationById(id);
                res.status(HttpStatus.OK).json(
                    {
                        reservation: "deleted"
                    }
                )
            } catch (error) {
                throw new UnprocessableEntityException(error);
            }
        }

        // get reservation by id
        @Get('getReservation/:id')
        async getReservationById(@Res() res: Response, @Param() id: string){
            try {
                const getingReservation = await this.reservationService.getReservationById(id);
                res.status(HttpStatus.OK).json(getingReservation);
            } catch (error) {
                throw new UnprocessableEntityException(error);
            }
        }


        // get all reservation 
        @Get('getAllReservation')
        async getAllReservation(@Res() res: Response){
            try {
                const getingReservation = await this.reservationService.getAllReservations();
                res.status(HttpStatus.OK).json(getingReservation);
            } catch (error) {
                throw new UnprocessableEntityException(error);
            }
        }

      

}

import { Body, Controller, Delete, forwardRef, Get, HttpStatus, Inject, Param, Post, Put, Res, UnprocessableEntityException } from '@nestjs/common';
import { Response } from 'express';
import { CarsService } from 'src/cars/cars.service';
import { RatesService } from 'src/rates/rates.service';
import { RantHistoryDto } from './dto/rantHistoryDto';
import { RentHistoryService } from './rent-history.service';

@Controller('rent-history')
export class RentHistoryController {
    constructor(
       private readonly RentHistoryService: RentHistoryService,
       @Inject(forwardRef(() => CarsService)) private readonly carsService: CarsService,
       @Inject(forwardRef(() => RatesService )) private readonly ratesService: RatesService
    ){}
     //+ "₽"
    // create new rent history
    @Post('rentHistory')
    async rentHistory(@Res() res: Response, @Body() body: RantHistoryDto){
        try {
            const getCarForRent = await this.carsService.findOne(body.carId);
            const getRatesForRent = await this.ratesService.getOneRates(body.tariffId);

            if(!getRatesForRent?.id){
                throw " rates id undifande "
            }
            
            if(!body.carId){
                throw " id is undefined!!! "
            }
            
            if(getCarForRent?.status !== "free"){
                throw "you can't rent this car , car is busy or cleaning";
            }
            
            const createRentHistory = await this.RentHistoryService.createRantHistory({
                carId: body.carId,
                tariffId: body.tariffId,
                daysCount: body.daysCount,
                startRantDate: body.startRantDate,
                estimatedPrice: +(body.daysCount)*(+(getRatesForRent.tariffPrice)),
                estimatedDistance: +(body.daysCount)*(+(getRatesForRent.tariffDistance))
            })
            
            const data = {
                status: "busy"
            }
            await this.carsService.updateCar(body.carId, data);
            return res.status(HttpStatus.OK).json(createRentHistory);

        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }
    // get one history
    @Get('getHistory/:id')
    async getHistory(@Res() res: Response, @Param() id: string){
        try {
           const historyGeting = await this.RentHistoryService.getRantHistory(id);
            if(!historyGeting){
                throw " this history is undifande "
            }
            res.status(HttpStatus.OK).json(historyGeting);
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }
    // get all historys
    @Get('getAllHistory')
    async getAllHistory(@Res() res: Response){
        try {
          const getAllHistory = await this.RentHistoryService.getAllRantHistorys();
          return res.status(HttpStatus.OK).json(getAllHistory);  
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }
    // delete history
    @Delete('deleteHistory/:id')
    async deleteRentHistory(@Res() res: Response, @Param() id: string){
        try {
            const historyGeting = await this.RentHistoryService.getRantHistory(id);
            if(!historyGeting){
                throw " this history is undifande "
            }
            await this.RentHistoryService.deleteRantHistory(id);
            
            res.status(HttpStatus.OK).json({
                success: "true - deleted history " 
            })
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }

    // update rent history
    @Put('updateRentHistory/:id')
    async updateRentHistory(@Res() res: Response,@Param() id: string, @Body() body: RantHistoryDto ){
        try {
            await this.RentHistoryService.updateRantHistory(id, body);
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }


}

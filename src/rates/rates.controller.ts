import { Body, Controller, HttpCode, Post, Res,UnprocessableEntityException, HttpStatus, Get, Param, Put, Delete } from '@nestjs/common';
import { RatesService } from './rates.service';
import { Response } from 'express';
import { RatesDto } from './dto/ratesDto';
@Controller('rates')
export class RatesController {

    constructor(
        private readonly RatesService: RatesService
    ){}

    // create tariffs
    @Post('createNewTariff')
    async createNewTariff(@Res() res: Response, @Body() body : RatesDto){
        try {
                const createTariff = await this.RatesService.addNewTariff({
                    tariffName: body.tariffName,
                    tariffPrice: body.tariffPrice ,
                    tariffDistance: body.tariffDistance 
                })
                    return res.status(HttpStatus.OK).json(createTariff);
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }

    // get one rates
    @Get('getOneRates/:id')
    async getOneRates(@Res()res: Response, @Param() id : string){
        try {
            const getOneRates = await this.RatesService.getOneRates(id);
            if(!getOneRates){
                throw " error don't have rates "
            }
            return res.status(HttpStatus.OK).json(getOneRates);
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }

    // get all rates
    @Get('getAllRates')
    async getAllRates(@Res() res: Response){
        try {
            const getAllRates = await this.RatesService.getAllRates();
            return res.status(HttpStatus.OK).json(getAllRates);
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }

    // update rates by id
    @Put('updateRates/:id')
    async updateRatesById(@Res() res: Response, @Param() id: string, @Body() body: RatesDto){
        try {
            const ratesId: string = id;
            const ratesForUpdate = await this.RatesService.getOneRates(ratesId);
             await this.RatesService.updateRates(ratesForUpdate!.id,{
                tariffName: body.tariffName,
                tariffPrice: body.tariffPrice ,
                tariffDistance: body.tariffDistance 
            })
 
            return res.status(HttpStatus.OK).json({
                success: true,
                tariff_name_update: body.tariffName,
                tariff_price_update: body.tariffPrice,
                tariff_distance_update: body.tariffDistance,

            });
        } catch (error) {
            throw new UnprocessableEntityException(error); 
        }
    }

    // delete rates
    @Delete('deleteRates/:id')
    async deleteRates(@Res() res: Response, @Param() id: string){
        try {
            
            const deleteId: string = id;
            const ratesForDelete = await this.RatesService.getOneRates(deleteId);
       
            if(!ratesForDelete){
                throw "undifand id"
            }
            await this.RatesService.deleteRatesById(deleteId);
       
        return res.status(HttpStatus.OK).json({"deleted rates id: " : deleteId});
        } catch (error) {
            throw new UnprocessableEntityException(error); 
        }
    }
}

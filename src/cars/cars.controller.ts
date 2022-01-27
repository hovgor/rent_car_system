import { Body, Controller, Delete, Get, Param, Post, Put, Res, UnprocessableEntityException,HttpStatus, Req } from '@nestjs/common';
import {  Response } from 'express';
import { CarsService } from './cars.service';
import { CarsDto } from './dto/carsDto';

@Controller('cars')
export class CarsController {
constructor(
private readonly CarsService : CarsService 
){}



// create car
    @Post('addCar')
    async addCar( @Res() res : Response , @Body() body: Omit<CarsDto,'id'>){
        try {
            await this.CarsService.creat({
                carBrand: body.carBrand,
                carModel: body.carModel,
                numberPlate: body.numberPlate,
                vinCode: body.vinCode,
                status: 'free'
            })
           const carData = await this.CarsService.getId(body.vinCode)  

            return res.status(HttpStatus.OK).json({
                success: true + " : create new car",
                cars_id: carData?.id 
            });
        } catch (error) {
            throw new UnprocessableEntityException(error)
        }
    }

// get car by id
    @Get('getCar/:id')
    async getCarWithId(@Res() res : Response , @Param() id: string){
        try {
            const oneCar = await this.CarsService.findOne(id)
            res.status(HttpStatus.OK).json(oneCar);
        } catch (error) {
            throw new UnprocessableEntityException(error)  
        }

    }

//  get all cars 
@Get('getAllCars')
async getAllCars(@Res() res: Response, ){
    try {
        const allCars = await this.CarsService.findAll();
        res.status(HttpStatus.OK).json(allCars);
    } catch (error) {
        throw new UnprocessableEntityException(error)
    }
}


// delete car by id
    @Delete('delete/:id')
    async deleteCarWithId(@Res()res:Response , @Param() id: string){
        try {
            if(id){
                await this.CarsService.remove(id);
            }
            res.status(HttpStatus.OK).json({
                success: true + " : delete the car"
            })
        } catch (error) {
            throw new UnprocessableEntityException(error)
        }
    }

// update car by id
    @Put('update/:id')
    async updateWithId(@Res() res: Response ,@Param() id: string, @Body() body: CarsDto){
        try {
            const carId: string = id;
           
           const carForUpdate = await this.CarsService.findOne(carId);
            await this.CarsService.updateCar(carForUpdate!.id,{
                carBrand: body.carBrand,
                carModel: body.carModel,
                numberPlate: body.numberPlate,
                vinCode: body.vinCode,
                status: body.status
            })
            const carData = await this.CarsService.getId(body.vinCode)  
            return res.status(HttpStatus.OK).json({
				success: true + " : update the car and car status",
                cars_id: carData?.id
			});

        } catch (error) {
            throw new UnprocessableEntityException(error)
        }

    }

}

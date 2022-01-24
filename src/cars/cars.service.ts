import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cars } from "./cars.entity";

@Injectable()
export class CarsService{
    constructor(
        @InjectRepository(Cars)
        private carsRepository: Repository<Cars>,
    ){}

    async creat(newCar: any){
        try {
            return this.carsRepository.save(this.carsRepository.create(newCar)) ;   
        } catch (error) {
            Logger.log('error=>', error);
			throw error;
        } 
    }
    async updateCar( carId: string, data: any){
        try {
            await this.carsRepository.update({id: carId},data);

        } catch (error) {
            
            Logger.log('error=>', error);
			throw error;
        }
    }
    async getId(vinCode1 : string) {
        return this.carsRepository.findOne({
            vinCode:vinCode1
        })
    }

    async findAll(): Promise<Cars[]>{
        return this.carsRepository.find();
    }

   async findOne(id: string): Promise<Cars | undefined>{
        return this.carsRepository.findOne(id);
    }

    async remove(id: string): Promise<void>{
        await this.carsRepository.delete(id);
    }
}
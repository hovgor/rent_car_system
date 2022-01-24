import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rates } from "./rates.entity";

@Injectable()
export class RatesService{
    constructor(
        @InjectRepository(Rates)
        private ratesRepository: Repository<Rates>
    ){}

    // add new tariff
    async addNewTariff(newTariffs: any){
        try {
                return this.ratesRepository.save(this.ratesRepository.create(newTariffs));
        } catch (error) {
            Logger.log('error=>', error);
			throw error;
        }
    }

    // update rates
    async updateRates(ratesId: string, data: any){
        try {
            
           return await this.ratesRepository.update({id: ratesId},data);

        } catch (error) {
            Logger.log('error=>', error);
			throw error;
        }
    }

    // get all rates 
    async getAllRates(): Promise<Rates[]> {
        try {
           return await this.ratesRepository.find()
        } catch (error) {
            Logger.log('error=>', error);
			throw error;
        }
    }

    // get one rates
    async getOneRates(ratesId: string): Promise<Rates | undefined>{
        try {

           return await this.ratesRepository.findOne(ratesId);
            
        } catch (error) {
            Logger.log('error=>', error);
			throw error;
        }
    }

    // delete one rates
    async deleteRatesById(ratesId: string): Promise<void>{
        try {
            await this.ratesRepository.delete(ratesId);
        } catch (error) {
            Logger.log('error=>', error);
			throw error;
        }
    }

    
}
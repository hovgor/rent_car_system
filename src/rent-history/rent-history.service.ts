import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RantHistory } from "./rent-history.entity";
import { Repository } from "typeorm";

@Injectable()
export class RentHistoryService{
    constructor(
        @InjectRepository(RantHistory)
        private rantHistoryRepasitory: Repository<RantHistory>
    ){}



        // create new rant history
    async createRantHistory(newRantHistory: any){
        try {
            return await this.rantHistoryRepasitory.save(this.rantHistoryRepasitory.create(newRantHistory));
        } catch (error) {
            Logger.log('error=>', error);
			throw error;
        }
    }

        // get rant history
    async getRantHistory(id: string): Promise<RantHistory | undefined>{
        try {
            return await this.rantHistoryRepasitory.findOne(id);
        } catch (error) {
            Logger.log('error=>',error);
            throw error;
        }
    }

        // get all historys
    async getAllRantHistorys(): Promise<RantHistory[]>{
        try {
            return await this.rantHistoryRepasitory.find();
        } catch (error) {
            Logger.log('error=>',error);
            throw error;
        }
    }    
    
        // delete rant history by id
    async deleteRantHistory(id: string): Promise<void>{
        try {
             await this.rantHistoryRepasitory.delete(id);
        } catch (error) {
            Logger.log('error=>',error);
            throw error;
        }
    }

        // update rant history by id
    async updateRantHistory(rantHistoryId: string, data : any){
        try {
            return await this.rantHistoryRepasitory.update({id: rantHistoryId}, data)
        } catch (error) {
            Logger.log('error=>',error);
            throw error;
        }
    }    







}
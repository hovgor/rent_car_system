import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Reservation } from "./reservation.entity";

@Injectable()
export class ReservationService{
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>
    ){}

    //create reservation 
    async createReservation(newReservation: any){
        try {
            return await this.reservationRepository.save(this.reservationRepository.create(newReservation));
        } catch (error) {
            Logger.log("error=>",error);
            throw error;
        }
    }


    // get one reservation by ID
    async getReservationById(id: string){
        try {
            return await this.reservationRepository.findOne(id);
        } catch (error) {
            Logger.log("error=>",error);
            throw error;
        }
    }

    // get all reservations
    async getAllReservations(){
        try {
            return await this.reservationRepository.find();
        } catch (error) {
            Logger.log("error=>",error);
            throw error;
        }
    }

    // delete reservation by ID
    async deleteReservationById(id: string): Promise<void>{
        try {
            await this.reservationRepository.delete(id);
        } catch (error) {
            Logger.log("error=>",error);
            throw error;    
        }
    }

    // update reservation
    async updateReservationById(id1: string, data: any){
        try {
            return await this.reservationRepository.update({id:id1},data);
        } catch (error) {
            Logger.log("error=>",error);
            throw error;
        }
    }
}
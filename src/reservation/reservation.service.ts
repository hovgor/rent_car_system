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

    
}
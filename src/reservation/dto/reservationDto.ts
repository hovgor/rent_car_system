import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ReservationDto{
    @IsNotEmpty()
    carId: string

    @IsNotEmpty()
    ratesId: string

    @IsNotEmpty()
    @IsNumber()
    daysCount: number

    @IsNotEmpty()
    startRantDay: Date

    @IsDate()
    endRantDay: Date
}
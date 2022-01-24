import { IsDate, IsNotEmpty } from "class-validator";

export class RantHistoryDto{
    @IsNotEmpty()
    carId: string;

    @IsNotEmpty()
    tariffId: string;

    @IsNotEmpty()
    daysCount: number;

    @IsDate()
    startRantDate: Date;

    @IsNotEmpty()
    estimatedPrice: string;

    @IsNotEmpty()
    estimatedDistance: string;
}
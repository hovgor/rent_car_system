import { IsNotEmpty, IsString } from "class-validator";

export class RatesDto{
    @IsNotEmpty()
    tariffName: string

    @IsNotEmpty()
    tariffPrice: string

    @IsNotEmpty()
    tariffDistance: string

    @IsString()
    createdDate: Date
}
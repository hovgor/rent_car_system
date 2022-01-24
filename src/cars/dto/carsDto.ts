import { IsNotEmpty,  IsString } from "class-validator";

export class CarsDto {
    id?: number;

    @IsNotEmpty()
    carBrand: string;

     @IsNotEmpty()
     carModel: string;

     @IsNotEmpty()
     numberPlate: string;

     @IsNotEmpty()
     vinCode: string;

     @IsString()
     status: string;
}
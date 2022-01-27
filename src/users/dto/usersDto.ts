import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UsersDto{
    
    id?: string;
    
    @IsNotEmpty()
    @IsString()
    userFirstName: string;
    
    @IsNotEmpty()
    @IsString()
    userLastName: string;

    @IsNotEmpty()
    @IsNumber()
    userAge: number;

    @IsNotEmpty()
    @IsDate()
    birthDate: Date;

    @IsNotEmpty()
    @IsString()
    userHistoryId: string;

    
    userCreateDate?: Date;
}

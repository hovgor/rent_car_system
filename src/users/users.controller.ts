import { Body, Controller, forwardRef, HttpStatus, Inject, Post, Res, UnprocessableEntityException } from '@nestjs/common';
import { Response } from 'express';
import { RentHistoryService } from 'src/rent-history/rent-history.service';
import { UsersDto } from './dto/usersDto';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UserService,
        @Inject(forwardRef(() => RentHistoryService)) private readonly rentHistoryService: RentHistoryService
    ){}

    // create user 
    @Post('createUser')
    async createUser(@Res() res: Response, @Body() body: UsersDto){
        try {
           const newUser = {
            userFirstName: body.userFirstName,
            userLastName: body.userLastName,
            userAge: body.userAge,
            birthDate: body.birthDate,
            userHistoryId: body.userHistoryId
           }
           
           const user = await this.userService.createUser(newUser);



           return res.status(HttpStatus.OK).json(user);




        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }




}

import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersDto } from "./dto/usersDto";
import { Users } from "./users.entity";

     
@Injectable()
export class UserService{
        constructor(
            @InjectRepository(Users)
            private userRepository: Repository<Users>
        ){}

        // create user
        async createUser(newUserData: UsersDto) : Promise<UsersDto>{
            try {
                return await this.userRepository.save(this.userRepository.create(newUserData));
            } catch (error) {
                Logger.log("error=> ", error);
                throw error;
            }
        }    
        // delete user
        async deleteUser(id: string): Promise<void>{
            try {
                await this.userRepository.delete(id);
            } catch (error) {
                Logger.log("error=> ", error);
                throw error;
            }
        }
        // get one user
        async getUser(id: string): Promise<UsersDto | undefined> {
            try {
                return await this.userRepository.findOne(id);
            } catch (error) {
                Logger.log("error=> ", error);
                throw error;
            }
        }
        // get all users
        async getAllUsers(): Promise<UsersDto[]> {
            try {
                return await this.userRepository.find();
            } catch (error) {
                Logger.log("error=> ", error);
                throw error;
            }
        }
        // update user
        async updateUser(id: string, data: UsersDto) {
            try {
                return await this.userRepository.update({id: id}, data );
            } catch (error) {
                Logger.log("error=> ", error);
                throw error;
            }
        }


}
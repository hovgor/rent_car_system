import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    userFirstName: string;
    
    @Column()
    userLastName: string;

    @Column()
    userAge: number;

    @CreateDateColumn()
    public birthDate: Date;

    @Column()
    userHistoryId: string;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    public userCreateDate: Date;
    
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Reservation{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    carId: string

    @Column()
    ratesId: string

    @Column()
    duration: string
    
    @Column()
    startDate: Date

    @Column()
    endDate: Date

}
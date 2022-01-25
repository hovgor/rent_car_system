import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
@Entity()
export class Reservation{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    carId: string

    @Column()
    ratesId: string

    @Column()
    daysCount: number

    @Column()
    price : string
    
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    public startRantDay: Date

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    public endRantDay: Date

}    
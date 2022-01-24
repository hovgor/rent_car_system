import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class RantHistory{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    carId: string;

    @Column()
    tariffId: string;

    @Column()
    daysCount: number;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    public startRantDate: Date;

    @Column()
    estimatedPrice: string;
    
    @Column()
    estimatedDistance: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    public rantDate: Date;
}
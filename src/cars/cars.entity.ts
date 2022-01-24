import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cars {
    @PrimaryGeneratedColumn()
    id: string;
    
    @Column()
    carBrand: string;

    @Column()
    carModel: string;

    @Column()
    numberPlate: string;
    
    @Column()
    vinCode: string;

    @Column({
        enum: ['free', 'busy', 'cleaning'],
        default: 'free'
    })
    status: string;

}
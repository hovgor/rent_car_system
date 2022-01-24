import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Rates{
    @PrimaryGeneratedColumn()
    id: string;

   @Column()
   tariffName: string

   @Column()
   tariffPrice: string

   @Column()
   tariffDistance: string

   @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
   public createdDate: Date;

   @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
   public updatedDate: Date;
}

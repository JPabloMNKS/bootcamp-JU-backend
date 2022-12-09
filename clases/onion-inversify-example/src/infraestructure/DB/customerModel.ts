import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class CustomerModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    fullName!: string;

    @Column()
    address!: string;

    @Column()
    gender!: string;

    @Column()
    age!: number;
}
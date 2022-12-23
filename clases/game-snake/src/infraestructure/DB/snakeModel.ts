import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Direction, Position } from '../../core/types';

@Entity()
export class SnakeModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    direction!: string;

    @Column()
    head!: string;

    @Column()
    tail!: string;

    @Column()
    size!: number;

} 


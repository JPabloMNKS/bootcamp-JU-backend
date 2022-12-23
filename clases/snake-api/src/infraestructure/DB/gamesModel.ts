import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class GamesModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({default: 0})
    score!: number;

    @Column()
    snake!: string;

    @Column()
    board!: string;

    @Column()
    boardSize!: number;

    @Column()
    gameStatus!: string;

    @Column()
    foodPosition: string;


}

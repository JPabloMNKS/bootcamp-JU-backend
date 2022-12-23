import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import Snake from '../../core/entitys/snake';
import { Position, GameStatus } from '../../core/types';

@Entity()
export class GameModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({default: 0})
    score!: number;

    @Column()
    snake!: string;

    @Column()
    board!: string;

    @Column()
    nextMove!: string;

    @Column()
    boardSize!: number;

    @Column()
    foodPosition!: string;

    @Column()
    speed!: number;

    @Column()
    gameStatus!: string;

    @Column()
    numberOfPlayers!: number;

}
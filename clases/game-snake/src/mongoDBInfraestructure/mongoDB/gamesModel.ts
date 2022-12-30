import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class GamesModel {
    @ObjectIdColumn()
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

    @Column()
    snakeBody: string;


}

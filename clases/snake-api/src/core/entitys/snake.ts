import { Direction, Position } from '../types';

export default class Snake {
    id?: string;
    direction: Direction;
    head: Position;
    tail: Position[];
    size: number;
}
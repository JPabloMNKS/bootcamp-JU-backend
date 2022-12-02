import { Color, File, Rank } from './types';
import Position from './position';

export default abstract class Piece{

    protected position: Position;

    constructor(
        private readonly color: Color,
        private file: File,
        private rank: Rank
    ){
        this.position = new Position(file,rank);
    }

    moveTo(position: Position){
        this.position = position;
    }
    
    abstract canMove(position: Position):boolean;
}
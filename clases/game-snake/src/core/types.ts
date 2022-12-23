export type Direction = 'Up' | 'Right' | 'Left' | 'Down';

export type Position = {
    x: number,
    y: number
}

export type GameStatus = 'Ready to Start' | 'Playing' | 'Ended' | 'Game Over'

const TYPES = {
    IUserRepository: Symbol.for('IUserRepository'),
    IUserService: Symbol.for('IUserService'),

    IGamesRepository: Symbol.for('IGamesRepository'),
    IGamesService: Symbol.for('IGamesService'),

    // IGameRepository: Symbol.for('IGameRepository'),
    // IGameService: Symbol.for('IGameService'),

    // ISnakeRepository: Symbol.for('ISnakeRepository'),
    // ISnakeService: Symbol.for('ISnakeService'),

};

export { TYPES };
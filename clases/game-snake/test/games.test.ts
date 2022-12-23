import { IGamesService } from '../src/core/services/interface/IGamesService';
import { myContainer } from './../src/core/inversify.config';
import { TYPES } from './../src/core/types';

describe('games service tests', () => {
  const gamesService = myContainer.get<IGamesService>(TYPES.IGamesService);

  gamesService.createEmptyBoard(4);

  it('should return matrix 4x4 with 0 value', () => {
    let matrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    expect(gamesService.createEmptyBoard(4)).toEqual(matrix);
  });

  it('should return matrix 3x3 with 0 value', () => {
    let matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(gamesService.createEmptyBoard(3)).toEqual(matrix);
  });

  it('should return random number greater that 0 and less 8', () => {
    let size = 8;
    expect(
      gamesService.randomNumberGenerator(size, 5, 3, 4).next().value
    ).toBeGreaterThanOrEqual(0);
    expect(
      gamesService.randomNumberGenerator(size, 5, 3, 4).next().value
    ).toBeLessThan(8);
  });

  it('should return new Position x=5, y=3', () => {
    let axis_x = 5;
    let axis_y = 3;
    expect(gamesService.changePosition(axis_x, axis_y)).toEqual(
      JSON.parse('{"x": 5, "y": 3}')
    );
  });

  it('should return random place', () => {
    let boardSize = 8;
    let seedOne = 432;
    let seedTwo = 562;
    let seedThree = 8325;
    expect(
      typeof gamesService.createRandomPlaceInBoard(
        boardSize,
        seedOne,
        seedTwo,
        seedThree
      ) === 'object'
    ).toBe(true);
  });

  it('should return new position up x=5, y=2 from x=5, y=3', () => {
    let actualPosition = {
      x: 5,
      y: 3,
    };
    let boardSize = 4;
    expect(gamesService.moveSnake('Up', actualPosition, boardSize)).toEqual(
      JSON.parse('{"x": 5, "y": 2}')
    );
  });

  it('should return new position down x=5, y=0 from x=5, y=3', () => {
    let actualPosition = {
      x: 5,
      y: 3,
    };
    let boardSize = 4;
    expect(gamesService.moveSnake('Down', actualPosition, boardSize)).toEqual(
      JSON.parse('{"x": 5, "y": 0}')
    );
  });

  it('should return new position right x=5, y=0 from x=5, y=3', () => {
    let actualPosition = {
      x: 5,
      y: 3,
    };
    let boardSize = 4;
    expect(gamesService.moveSnake('Right', actualPosition, boardSize)).toEqual(
      JSON.parse('{"x": 0, "y": 3}')
    );
  });

  it('should return new position Left x=5, y=0 from x=5, y=3', () => {
    let actualPosition = {
      x: 5,
      y: 3,
    };
    let boardSize = 4;
    expect(gamesService.moveSnake('Left', actualPosition, boardSize)).toEqual(
      JSON.parse('{"x": 4, "y": 3}')
    );
  });

  it('should return truth, cuz is in the same position', () => {
    let snakePosition = {
      x: 5,
      y: 5,
    };

    let foodPosition = {
      x: 5,
      y: 5,
    };
    expect(gamesService.eatFood(snakePosition, foodPosition)).toBeTruthy();
  });

  it('should return false, cuz is in the same position', () => {
    let snakePosition = {
      x: 3,
      y: 1,
    };

    let foodPosition = {
      x: 2,
      y: 6,
    };
    expect(gamesService.eatFood(snakePosition, foodPosition)).toBeFalsy();
  });

  it('should return grow snake', () => {
    let actualPosition = {
      x: 5,
      y: 5,
    };
    expect(gamesService.growSnake(actualPosition)).toEqual(
      JSON.parse('[{"x": 5, "y": 5}]')
    );
  });
});

import King from '../src/king';
import Position from '../src/position';

describe('Test king movement', () => {
    const king = new King('White', 'E', 1);

    it('Should move one place forward', () => {
        let position = new Position('E', 2);
        expect(king.canMove(position)).toBe(true);
    });

    it('Should move one place right', () => {
        let position = new Position('E', 1);
        expect(king.canMove(position)).toBe(false);
    });

    it('Should move one place to the left', () => {
        let position = new Position('D', 1);
        expect(king.canMove(position)).toBe(true);
    });

    it('Shouldn\'t move forward more than 1 space', () => {
        let position = new Position('E', 3);
        expect(king.canMove(position)).toBe(false);
    });

});


import Position from '../src/position';
import Bishop from '../src/bishop';


describe('Bishop tests', () => {
    let bishop = new Bishop('White', 'C', 1);

    it('Should not move vertically', () => {
        let position = new Position('C', 8);
        expect(bishop.canMove(position)).toBe(false);
    });

    it('Should not move horizontally', () => {
        let position = new Position('A', 1);
        expect(bishop.canMove(position)).toBe(false);
    });

    it('Should move diagonally right', () => {
        let position = new Position('H', 6);
        expect(bishop.canMove(position)).toBe(true);
    });

    it('Should move diagonally left', () => {
        let position = new Position('A', 3);
        expect(bishop.canMove(position)).toBe(true);
    });

    it('Should not move L ', () => {
        let position = new Position('D', 3);
        expect(bishop.canMove(position)).toBe(false);
    });

    it('Should not move L ', () => {
        let position = new Position('B', 3);
        expect(bishop.canMove(position)).toBe(false);
    });

    it('Should not move other places 1', () => {
        let position = new Position('C', 5);
        expect(bishop.canMove(position)).toBe(false);
    });

    it('Should not move other places 2', () => {
        let position = new Position('F', 8);
        expect(bishop.canMove(position)).toBe(false);
    });

    it('It should not move to the same position', () => {
        let position = new Position('C', 1);
        expect(bishop.canMove(position)).toBe(false);
    });


});
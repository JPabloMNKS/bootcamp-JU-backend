import Position from '../src/position';
import Queen from '../src/queen';



describe('Queen tests', () => {
    
    let queen = new Queen('White', 'D', 1);
    it('Should move vertically', () => {
        let position = new Position('D', 8);
        expect(queen.canMove(position)).toBe(true);
    });

    it('Should move horizontally', () => {
        let position = new Position('A', 1);
        expect(queen.canMove(position)).toBe(true);
    });

    it('Should move diagonally', () => {
        let position = new Position('H', 5);
        expect(queen.canMove(position)).toBe(true);

        position = new Position('A', 4);
        expect(queen.canMove(position)).toBe(true);
    });

    it('Should not move L', () => {
        let position = new Position('C', 3);
        expect(queen.canMove(position)).toBe(false);

        position = new Position('E', 3);
        expect(queen.canMove(position)).toBe(false);
    });

    it('Should not move other places', () => {
        let position = new Position('C', 5);
        expect(queen.canMove(position)).toBe(false);

        position = new Position('F', 8);
        expect(queen.canMove(position)).toBe(false);
    });

    it('It should not move to the same position', () => {
        expect(queen.canMove(new Position('D',1))).toBe(false);
    });
});
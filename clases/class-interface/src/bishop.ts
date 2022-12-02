import Piece from './piece';
import position from './position';
export default class Bishop extends Piece {
  canMove(position: position): boolean {
    if (
      this.position.getRank() == position.getRank() &&
      this.position.getFile().charCodeAt(0) == position.getFile().charCodeAt(0)
    )
      return false;

    return (
      Math.abs(this.position.getRank() - position.getRank()) ==
      Math.abs(
        this.position.getFile().charCodeAt(0) - position.getFile().charCodeAt(0)
      )
    );
  }
}

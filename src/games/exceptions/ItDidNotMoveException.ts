import Exception from './Exception';

export default class ItDidNotMoveException extends Exception {
  constructor() {
    super('ItDidNotMoveException', "the piece could'nt move");
  }
}

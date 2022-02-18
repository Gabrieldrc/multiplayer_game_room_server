import Exception from './Exception';

export default class NotFoundStateException extends Exception {
  constructor() {
    super('NotFoundStateException', 'No state was found for this room');
  }
}

import Exception from './Exception';

export default class MongoServerError extends Exception {
  constructor(message: string) {
    super('MongoServerError', message);
  }
}

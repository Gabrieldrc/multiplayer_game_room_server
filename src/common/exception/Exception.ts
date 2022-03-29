import { Logger } from '@nestjs/common';

export default abstract class Exception implements Error {
  name: string;
  message: string;
  stack?: string;

  constructor(name?: string, message?: string) {
    this.name = name;
    this.message = message;
    new Logger('Exception').error(`Throw ${this.name}`);
  }

  setMessage(message: string) {
    this.message = message;
  }

  setStack(stack: string) {
    this.stack = stack;
  }
}

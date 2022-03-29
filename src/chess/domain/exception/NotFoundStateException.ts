import { NotFoundException } from '@nestjs/common';

export default class NotFoundStateException extends NotFoundException {
  constructor() {
    super('No state was found for this room', 'NotFoundStateException');
  }
}

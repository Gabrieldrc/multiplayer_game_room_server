import { NotFoundException } from '@nestjs/common';

export default class NotFoundRoomException extends NotFoundException {
  constructor() {
    super('No room was found with that id', 'NotFoundRoomException');
  }
}

import { BadRequestException } from '@nestjs/common';

export default class GamePlayersFullException extends BadRequestException {
  constructor() {
    super(
      'The game is full and no admit more players',
      'GamePlayersFullException',
    );
  }
}

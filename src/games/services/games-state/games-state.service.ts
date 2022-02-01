import { Injectable } from '@nestjs/common';

@Injectable()
export class GamesStateService {
  private gameStates: Map<string, any>;

  constructor() {
    this.gameStates = new Map<string, any>();
  }

  getGameStates(): Map<string, any> {
    return this.gameStates;
  }

  setGameStates(value: Map<string, any>) {
    this.gameStates = value;
  }

  setGameState(room: string, game: any) {
    this.gameStates.set(room, game);
  }
  getGameState(room: string): any {
    return this.getGameStates().get(room);
  }
}

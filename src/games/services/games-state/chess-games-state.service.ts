import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChessGameState } from 'src/games/chess/schemas/chess-game-state.schema';
import GameStateService from 'src/games/interfaces/GameStateService';

@Injectable()
export class ChessGamesStateService implements GameStateService {
  private gameStates: Map<string, any>;

  constructor(
    @InjectModel(ChessGameState.name)
    private chessGameStateModel: Model<ChessGameState>,
  ) {}

  async setGameState(room: string, game: any): Promise<ChessGameState> {
    const createdChessGameState = new this.chessGameStateModel({
      roomId: room,
      ...game,
    });
    return createdChessGameState.save();
  }
  getGameState(room: string) {
    return this.chessGameStateModel.findOne({ roomId: room });
  }
}

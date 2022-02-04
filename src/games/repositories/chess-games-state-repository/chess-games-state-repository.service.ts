import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChessGameState } from 'src/games/chess/schemas/chess-game-state.schema';
import GameStateRepository from 'src/games/interfaces/GameStateRepository';

@Injectable()
export class ChessGamesStateRepository implements GameStateRepository {
  private logger: Logger = new Logger('ChessGamesStateRepository');

  constructor(
    @InjectModel(ChessGameState.name)
    private chessGameStateModel: Model<ChessGameState>,
  ) {}

  async createGameState(stateObj: any) {
    const createdChessGameState = new this.chessGameStateModel(stateObj);
    try {
      const result = await createdChessGameState.save();
      return result;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  async findGameState(room: string) {
    try {
      const document = await this.chessGameStateModel.findOne({ roomId: room });
      return document
    } catch(error: any) {
      this.logger.error(error);
      return null;
    }
  }

  async updateGameState(gameState: ChessGameState) {
    const model = await this.findGameState(gameState.roomId);
    model.board = gameState.board;
    model.turn = gameState.turn;
    model.update();
  }

  async deleteGameState(room: string) {
    const model = await this.findGameState(room);
    model.delete();
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChessGameState } from 'src/games/chess/schemas/chess-game-state.schema';
import GameStateService from 'src/games/interfaces/GameStateService';

@Injectable()
export class ChessGamesStateService implements GameStateService {
  private logger: Logger = new Logger('ChessGamesStateService');
  constructor(
    @InjectModel(ChessGameState.name)
    private chessGameStateModel: Model<ChessGameState>,
  ) {}

  async createGameState(room: string, game: any): Promise<ChessGameState> {
    const createdChessGameState = new this.chessGameStateModel({
      roomId: room,
      ...game,
    });
    try {
      const result = await createdChessGameState.save();
      return result;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  async findGameState(room: string) {
    return await this.chessGameStateModel.findOne({ roomId: room });
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

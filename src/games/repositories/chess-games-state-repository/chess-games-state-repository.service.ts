import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { ChessGameState } from 'src/games/chess/schemas/chess-game-state.schema';
import GameStateRepository from 'src/games/interfaces/GameStateRepository';

@Injectable()
export class ChessGamesStateRepository implements GameStateRepository {
  private logger: Logger = new Logger('ChessGamesStateRepository');

  constructor(
    @InjectModel(ChessGameState.name)
    private chessGameStateModel: Model<ChessGameState>,
  ) {}

  createGameState(stateObj: any): Document<ChessGameState> | null {
    const createdChessGameState = new this.chessGameStateModel(stateObj);
    let result;
    createdChessGameState
      .save()
      .then((document) => (result = document))
      .catch((error) => {
        this.logger.error(error);
        result = null;
      });
    return result;
  }

  async findGameState(room: string): Promise<Document<ChessGameState, any, any>> {
    let result = null;
    try {
      result = await this.chessGameStateModel.findOne({ roomId: room });
    } catch (error) {
      this.logger.error(error);
    }

    return result;
  }

  async updateGameState(gameState: ChessGameState) {
    // const model = await this.findGameState(gameState.roomId);
    // model.board = gameState.board;
    // model.turn = gameState.turn;
    // model.update();
  }

  async deleteGameState(room: string) {
    // const model = await this.findGameState(room);
    // model.delete();
  }
}

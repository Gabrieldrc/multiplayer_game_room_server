import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChessGameState } from '@games/chess/schemas/chess-game-state.schema';
import MongoServerError from '@games/exceptions/MongoServerError';
import GameStateRepository from '@games/interfaces/GameStateRepository';

@Injectable()
export class ChessGamesStateRepository implements GameStateRepository {
  private logger: Logger = new Logger('ChessGamesStateRepository');

  constructor(
    @InjectModel(ChessGameState.name)
    private chessGameStateModel: Model<ChessGameState>,
  ) {}

  async setGameState(stateObj: ChessGameState) {
    let document = await this.findGameState(stateObj.roomId);
    if (!document) {
      document = await this.createGameState(stateObj);
      return document;
    }
    document = await this.updateGameState(stateObj, document);
    return document;
  }

  private async createGameState(stateObj: ChessGameState) {
    const createdChessGameState = new this.chessGameStateModel(stateObj);
    let document;
    try {
      document = await createdChessGameState.save();
    } catch (error) {
      throw new MongoServerError(error.message);
    }

    return document;
  }

  async findGameState(room: string) {
    let result = null;
    try {
      result = await this.chessGameStateModel.findOne({ roomId: room });
    } catch (error) {
      throw new MongoServerError(error.message);
    }

    return result;
  }

  private async updateGameState(stateObj: ChessGameState, document: any) {
    document.board = stateObj.board;
    document.turn = stateObj.turn;
    document.players = stateObj.players;
    try {
      document = await document.save();
    } catch (error) {
      throw new MongoServerError(error.message);
    }
    return document;
  }

  async deleteGameState(room: string) {
    // const model = await this.findGameState(room);
    // model.delete();
  }
}

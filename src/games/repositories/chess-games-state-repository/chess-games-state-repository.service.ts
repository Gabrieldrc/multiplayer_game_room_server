import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  ChessGameStateDocument,
  ChessGameStateEntity,
} from '@games/chess/schemas/chess-game-state.schema';
import MongoServerError from '@games/exceptions/MongoServerError';
import GameStateRepository from '@games/interfaces/GameStateRepository';
import ChessGameState from '@games/chess/interfaces/ChessGameState';

@Injectable()
export class ChessGamesStateRepository implements GameStateRepository {
  private logger: Logger = new Logger('ChessGamesStateRepository');

  constructor(
    @InjectModel(ChessGameStateEntity.name)
    private chessGameStateModel: Model<ChessGameStateEntity>,
  ) {}

  async updateGameStateObject(stateObj: ChessGameState) {
    let document = null;

    document = await this.findGameState(stateObj.roomId);

    if (!document) return document;

    document = await this.updateGameState(stateObj, document);
    return this.documentToObject(document);
  }

  async createGameStateObject(stateObj: ChessGameState) {
    let document = this.objectToDocument(stateObj);
    try {
      document = await document.save();
    } catch (error) {
      throw new MongoServerError(error.message);
    }

    return this.documentToObject(document);
  }
  async findGameStateObject(room: string) {
    const document = await this.findGameState(room);
    if (!document) {
      return null;
    }

    return this.documentToObject(document);
  }

  async deleteGameState(room: string) {
    // const model = await this.findGameState(room);
    // model.delete();
  }

  private async findGameState(id: string) {
    let result = null;
    try {
      result = await this.chessGameStateModel.findById(id);
    } catch (error) {
      throw new MongoServerError(error.message);
    }

    return result;
  }

  private async updateGameState(
    stateObj: ChessGameState,
    document: ChessGameStateDocument,
  ) {
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

  private documentToObject(document: ChessGameStateDocument): ChessGameState {
    return {
      board: document.board,
      players: document.players,
      turn: document.turn,
      roomId: document._id,
    };
  }

  private objectToDocument(state: ChessGameState): ChessGameStateDocument {
    return new this.chessGameStateModel({
      board: state.board,
      players: state.players,
      turn: state.turn,
    });
  }
}

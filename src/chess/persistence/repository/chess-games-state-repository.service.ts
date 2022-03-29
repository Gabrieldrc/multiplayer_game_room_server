import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  ChessGameStateDocument,
  ChessGameStateEntity,
} from '@chess/persistence/schemas/chess-game-state.schema';
import MongoServerError from '@common/exception/MongoServerError';
import ChessGameState from '@chess/domain/dto/ChessGameState';

@Injectable()
export class ChessGamesStateRepository {
  private logger: Logger = new Logger('ChessGamesStateRepository');

  constructor(
    @InjectModel(ChessGameStateEntity.name)
    private chessGameStateModel: Model<ChessGameStateEntity>,
  ) {}

  async updateGameStateObject(stateObj: ChessGameState) {
    let document = null;

    document = await this.findGameStateByRoomId(stateObj.roomId);

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
  async findGameStateObjectByRoom(room: string) {
    const document = await this.findGameStateByRoomId(room);
    if (!document) {
      return null;
    }

    return this.documentToObject(document);
  }

  async deleteGameStateByRoom(room: string) {
    // const model = await this.findGameState(room);
    // model.delete();
  }

  private async findGameStateByRoomId(id: string) {
    let result = null;
    try {
      result = await this.chessGameStateModel.findOne({ roomId: id });
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
    document.roomId = stateObj.roomId;
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
      roomId: document.roomId,
    };
  }

  private objectToDocument(state: ChessGameState): ChessGameStateDocument {
    return new this.chessGameStateModel({
      board: state.board,
      players: state.players,
      turn: state.turn,
      roomId: state.roomId,
    });
  }
}

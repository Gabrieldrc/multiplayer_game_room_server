import { Injectable, Logger } from '@nestjs/common';

import Chess from '../class/chess';
import { PieceFactoryService } from './piece-factory.service';
import { ChessGamesStateRepository } from '@chess/persistence/repository/chess-games-state-repository.service';
import ChessGameState from '../dto/ChessGameState';
import NotFoundStateException from '../exception/NotFoundStateException';
import { PieceModel } from '../interface/PieceModel';
import Room from '@room/domain/dto/room.dto';

@Injectable()
export class ChessGamesStateService {
  private logger: Logger = new Logger('ChessGamesStateService');

  constructor(
    private chessStateRepository: ChessGamesStateRepository,
    private pieceFactory: PieceFactoryService,
  ) {}

  async createGameState(game: Chess, room: Room) {
    return await this.chessStateRepository.createGameStateObject({
      ...game.getState(),
      roomId: room.roomId,
    });
  }

  async updateGameState(gamestate: ChessGameState) {
    const state = await this.chessStateRepository.updateGameStateObject(
      gamestate,
    );
    if (!state) {
      throw new NotFoundStateException();
    }

    return state;
  }

  async getGame(room: string): Promise<Chess> {
    const chessState =
      await this.chessStateRepository.findGameStateObjectByRoom(room);
    if (!chessState) {
      throw new NotFoundStateException();
    }

    return this.gameStateToGameObject(chessState);
  }

  private gameStateToGameObject(gameState: ChessGameState) {
    const gameObject = new Chess(this.pieceFactory);

    gameObject.setBoard(this.boardStateToBoardObject(gameState.board));
    gameObject.setTurn(gameState.turn);
    gameObject.setPlayers(gameState.players);

    return gameObject;
  }

  private boardStateToBoardObject(boardState: PieceModel[][]) {
    const boardObject = [];
    boardState.map((col, i) => {
      boardObject.push([]);
      col.map((element, j) => {
        boardObject[i].push(
          this.pieceFactory.getPiece(
            element.name,
            element.player,
            element.position.i,
            element.position.j,
          ),
        );
      });
    });

    return boardObject;
  }

  deleteGameState(room: string) {
    return this.chessStateRepository.deleteGameStateByRoom(room);
  }
}

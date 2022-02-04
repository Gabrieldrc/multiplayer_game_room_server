import { Injectable, Logger } from '@nestjs/common';
import { Document } from 'mongoose';
import Chess from 'src/games/chess/chess';
import { PieceFactoryService } from 'src/games/chess/factories/piece-factory/piece-factory.service';
import { PieceModel } from 'src/games/chess/interfaces/PieceModel';
import { ChessGameState } from 'src/games/chess/schemas/chess-game-state.schema';
import { ChessGamesStateRepository } from 'src/games/repositories/chess-games-state-repository/chess-games-state-repository.service';

@Injectable()
export class ChessGamesStateService {
  private logger: Logger = new Logger('ChessGamesStateService');

  constructor(
    private chessStateRepository: ChessGamesStateRepository,
    private pieceFactory: PieceFactoryService,
  ) {}

  createGameState(room: string, game: Chess) {
    const state = this.chessStateRepository.createGameState({
      roomId: room,
      ...game.getState(),
    });
    if (state) {
      return true;
    }
    return false;
  }

  async getGame(room: string): Promise<Chess> {
    const document = await this.chessStateRepository.findGameState(room);
    if (!document) {
      return null;
    }

    return this.gameStateToGameObject(document);
  }

  private gameStateToGameObject(gameState: any): Chess {
    const gameObject = new Chess(this.pieceFactory);

    gameObject.setBoard(this.boardStateToBoardObject(gameState.board));
    gameObject.setTurn(gameState.turn);

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

  updateGameState(room: string, game: Chess) {
    const state = this.chessStateRepository.updateGameState({
      roomId: room,
      ...game.getState(),
    });
    if (state) {
      return true;
    }
    return false;
  }

  deleteGameState(room: string) {
    return this.chessStateRepository.deleteGameState(room);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import Chess from 'src/games/chess/chess';
import { PieceFactoryService } from 'src/games/chess/factories/piece-factory/piece-factory.service';
import { PieceModel } from 'src/games/chess/interfaces/PieceModel';
import NotFoundStateException from 'src/games/exceptions/NotFoundStateException';
import { ChessGamesStateRepository } from 'src/games/repositories/chess-games-state-repository/chess-games-state-repository.service';

@Injectable()
export class ChessGamesStateService {
  private logger: Logger = new Logger('ChessGamesStateService');

  constructor(
    private chessStateRepository: ChessGamesStateRepository,
    private pieceFactory: PieceFactoryService,
  ) {}

  async setGameState(room: string, game: Chess) {
    const state = await this.chessStateRepository.setGameState({
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
      throw new NotFoundStateException();
    }

    return this.gameStateToGameObject(document);
  }

  private gameStateToGameObject(gameState: any): Chess {
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
    return this.chessStateRepository.deleteGameState(room);
  }
}

# Multiplayer game room server (Changelog)
Últimos cambios realizados al repositorio de multiplayer_game_room_server

<!-- Added | Changed | Fixed | Removed -->
## [Unreleased]

## [v1.2.1] - 2022-22-03
### Changed
- Se modificó la arquitectura de la aplicacion para que se iniciaran y unieran a los juegos desde las api recibiendo (solo los jugadores) un token que les serviria para poder jugar en el socket.
- En los socket se elimino el newGame. El JoinGame ahora es para que se unan a la sala (cualquiera puede unirse para recibir la actualizacion del juego). Play ahora tiene un Guard para que solo puedan acceder los poseedores de los token (los jugadores).

## [v1.1.1] - 2022-22-03
### Changed
- Se modifico el funcionamiento de room service, para que funcione con mongo, por tanto se creo el schema, el repositoryservice, y se utilizo de remplazo en chess gateway y controller

## [v1.0.1] - 2022-22-03
### Fixed
- Se hizo un refactor en los imports para separar import de externos e internos. Ademas se corrigió el documento de mongo para que el roomId represente el id del documento de mongo, asi el ChessGameStateEntity representa el schema y ahora ChessGameState es el objeto.

## [v1.0.0] - 2022-21-03
### Added
- Primer lanzamiento a produccion


[Unreleased]: https://github.com/Gabrieldrc/multiplayer_game_room_server/compare/1.1.1...HEAD
[v1.1.1]: https://github.com/Gabrieldrc/multiplayer_game_room_server/compare/1.0.1...1.1.1
[v1.0.1]: https://github.com/Gabrieldrc/multiplayer_game_room_server/compare/1.0.0...1.0.1
[v1.0.0]: https://github.com/Gabrieldrc/multiplayer_game_room_server/tags/1.0.0

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PlayerToken } from '@auth/domain/model/playeToken.model';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generatePlayerJWT(data: any) {
    const payload: PlayerToken = {
      role: data.role,
      sub: { player: data.player, room: data.room },
    };
    return {
      access_token: this.jwtService.sign(payload),
      ...data,
    };
  }

  extractTokenFromSocketClient(client: any) {
    const player_token: string =
      client.handshake.auth.player_token.split(' ')[1];
    const payload = this.jwtService.decode(player_token) as PlayerToken;

    return {
      role: payload.role,
      player: payload.sub.player,
      roomId: payload.sub.room,
    };
  }
}

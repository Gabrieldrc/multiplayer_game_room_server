import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import config from '@config/config';
import { ConfigType } from '@nestjs/config';
import { Socket } from 'socket.io';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      jwtFromRequest: (client: Socket) => {
        const player_token: string = client.handshake.auth.player_token;
        if (!player_token) return null;
        return player_token.split(' ')[1];
      },
      secretOrKey: configService.jwt.secret,
    });
  }
  async validate(payload: any) {
    return {
      role: payload.role,
      player: payload.sub.player,
      room: payload.sub.room,
    };
  }
}

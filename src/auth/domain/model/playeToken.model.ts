export interface PlayerToken {
  role: string; // user, guest, admin
  sub: {
    player: number;
    room: string;
  };
}

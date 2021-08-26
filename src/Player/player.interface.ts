export enum PlayerPosition {
  GK = 'Gk',
  DF = 'Df',
  Mf = 'Mf',
  St = 'St',
}

export interface Iplayer {
  firstName: string;
  lastName: string;
  playerId: number;
  playerNation: string;
  playerHeight: number;
  defaultShirtNumber: number;
  currentShirtNumber: number;
  playerposition: PlayerPosition;
}

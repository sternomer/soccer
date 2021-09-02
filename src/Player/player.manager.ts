import {  getPlayerNumberInTeamRepo } from './player.repository';
import PlayerSchema from './player.model';

export async function getPlayersNumberInplayerManger(teamInt: number) {
  const checkNumber = await getPlayerNumberInTeamRepo(teamInt);
  const playersNumber: number[] = checkNumber[0].playersNumber;
  return playersNumber;
}
export function gkHeightValidation(req) {
  if (req.body.playerPosition === 'Gk' && req.body.playerHeight < 185) {
    throw 'gk is too short';
  }
}
export async function createNewPlayer(req) {
  const newPlayer = new PlayerSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    playerId: req.body.playerId,
    playerNation: req.body.playerNation,
    playerHeight: req.body.playerHeight,
    defaultShirtNumber: req.body.defaultShirtNumber,
    currentShirtNumber: req.body.currentShirtNumber,
    playerPosition: req.body.playerPosition,
  });

  const savedPlayer = await newPlayer.save();
  return savedPlayer;
}




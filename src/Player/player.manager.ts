import { createNewPlayerInRepo, getPlayerNumberInTeamRepo } from './player.repository';

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
  const newPlayer = createNewPlayerInRepo(req);

  const savedPlayer = await newPlayer.save();
  return savedPlayer;
}




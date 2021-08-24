import { getCurrentPlayerNumberInRepo, getPlayersNumberInTeamRepo, updateNumber } from './team.repository';

export async function getPlayersNumberInTeamManger(teamInt: number) {
  const checkNumber = Array.from(await getPlayersNumberInTeamRepo(teamInt));
  //   const playersNumber: number[] = checkNumber[0].playersNumber;
  return checkNumber;
}
export async function getCurrentPlayerNumberInManager(playerId: string) {
  const checkNumberCurr = await getCurrentPlayerNumberInRepo(playerId);
  const currentNumber = checkNumberCurr;
  console.log(currentNumber);

  return currentNumber;
}
export async function checkIfNumberavailable(teamInt: number, playerId: string) {
  const teamPlayers = await getPlayersNumberInTeamManger(teamInt);
  // const playersNumber: number[] = checkNumber[0].playersNumber;
  let playerNum = await getCurrentPlayerNumberInManager(playerId);

  playerNum = await updatePlayerNumber(playerNum, teamPlayers, playerId);
  return playerNum;
}

export async function updatePlayerNumber(playerNum: any, teamPlayers: any[], playerId: number | string) {
  playerNum = generateNewNumber(teamPlayers, playerNum);

  const updateTheNum = await updateNumber(playerId, playerNum);
  return updateTheNum;
}


export function generateNewNumber(teamPlayers: any[], playerNum: any) {
  if (teamPlayers.includes(playerNum)) {
    let isExisted = true;
    while (isExisted) {
      playerNum = Math.floor(Math.random() * 99) + 1;
      isExisted = teamPlayers.includes(playerNum);
    }
  }
  return playerNum;
}

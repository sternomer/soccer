import {getPlayerNumberInTeamRepo} from './player.repository'

export async function getPlayersNumberInplayerManger(teamInt: number) {
    const checkNumber = await getPlayerNumberInTeamRepo(teamInt);
    const playersNumber: number[] = checkNumber[0].playersNumber;
    return playersNumber;
  }
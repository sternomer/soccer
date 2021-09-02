import {
  findPlayerToUpdate,
  getCurrentPlayerNumberInRepo,
  getIdofAllPlayersRepo,
  getPlayersId,
  getPlayersNumberInTeamRepo,
  getPossitionOfPlayers,
  updateNumber,
} from './team.repository';
import { Request, Response } from 'express';
import { Iplayer } from '../Player/player.interface';

export function checkPostValidation(checkDuplicate: (array) => boolean, teamPlayer: number[], res: Response) {
  if (checkDuplicate(teamPlayer)) {
    res.status(400).send('error you insert the same id twice');
    throw 'you insert the same id twice';
  } else if (teamPlayer.length > 25) {
    res.send('the team can only have 25 players');
    throw 'the team can only have 25 players';
  }
}
export async function updateNumberstoPost(teamPlayer: number[], myid: Iplayer[], allnumbers: number[]) {
  
  for (let i: number = 0; i < teamPlayer.length; i++) {
    await findPlayerToUpdate(myid, teamPlayer, i, allnumbers);
  }
  for (let i = 0; i < myid.length; i++) {
    const element = myid[i];
    allnumbers = [];
    myid.forEach((p) => allnumbers.push(p.currentShirtNumber));

    updatePlayerNumber(element.currentShirtNumber, allnumbers, element.playerId);
  }
  return allnumbers;
}


export function checkIfBiggerThan25(myId: number[][]) {
  if (myId[0].length > 25) {
    throw 'the team can only have 25 players';
  }
}


export function checkIfIdExistInPut(playerId: any, myId: number[][], res: Response<any, Record<string, any>>) {
  for (let i = 0; i <= playerId.length; i++) {
    if (myId[0].includes(playerId[i])) {
      res.send('the id allready exist');
      throw 'the id allready exist';
    }
  }
}

export function changePlayerNumber(playersnumber: number[], playerNumber: number, currentPlayer: Iplayer, playerId: any) {
  if (playersnumber.includes(playerNumber)) {
    updatePlayerNumber(currentPlayer.currentShirtNumber, playersnumber, playerId);
  }
}




export async function getPlayersNumberInTeamManger(teamInt: number) {
  const checkNumber = Array.from(await getPlayersNumberInTeamRepo(teamInt));
  return checkNumber;
}


export async function getPlayersIdInTeamManger(teamInt: number) {
  const checkNumber = Array.from(await getPlayersNumberInTeamRepo(teamInt));

  return checkNumber;
}

export async function getIdOfAllteamPlayers(teamInt: number) {
  const getId = Array.from(await getPlayersId(teamInt));
  const playersNumber: number[][] = [];
  getId.forEach((docs) => {
    playersNumber.push(docs.playerlist);
  });
  return playersNumber;
}

export async function getCurrentPlayerNumberInManager(playerId: string) {
  const checkNumberCurr = await getCurrentPlayerNumberInRepo(playerId);
  const currentNumber = checkNumberCurr;
  return currentNumber;
}

export async function checkIfNumberavailable(teamInt: number, playerId: string) {
  const teamPlayers = await getPlayersNumberInTeamManger(teamInt);
  let playerNum = await getCurrentPlayerNumberInManager(playerId);

  playerNum = await updatePlayerNumber(playerNum, teamPlayers, playerId);
  return playerNum;
}

export async function updatePlayerNumber(playerNum: number, teamPlayers: number[], playerId: number | string) {
  playerNum = generateNewNumber(teamPlayers, playerNum);

  const updateTheNum = await updateNumber(playerId, playerNum);
  return updateTheNum;
}

export function generateNewNumber(teamPlayers: number[], playerNum: number) {
  if (teamPlayers.includes(playerNum)) {
    let isExisted = true;
    while (isExisted) {
      playerNum = Math.floor(Math.random() * 99) + 1;
      isExisted = teamPlayers.includes(playerNum);
    }
  }
  return playerNum;
}
//check for duplicate//
export async function getIDManager(teamInt) {
  const myids: number[] = await getIdofAllPlayersRepo(teamInt);
  return myids;
}

export async function checkifFull(myId: number[][], playerId: number[]) {
  for (let i = 0; i <= playerId.length; i++) {
    if (myId[0].includes(playerId[i])) {
      throw 'the id allready exist';
    }
  }
}

export async function checkIfTeamIsValidate(teamInt: number, _req: Request, res: Response) {
  const getId = Array.from(await getPlayersId(teamInt));

  const Gk: string[] = [];
  const Df: string[] = [];
  const Mf: string[] = [];
  const St: string[] = [];

  for (let i = 0; i < getId[0].playerlist.length; i++) {
    let possitions: string = await getPossitionOfPlayers(getId[0].playerlist[i]);

    if (possitions == 'Gk') {
      Gk.push(possitions);
    } else if (possitions == 'Df') {
      Df.push(possitions);
    } else if (possitions == 'Mf') {
      Mf.push(possitions);
    } else {
      St.push(possitions);
    }
  }

  if (Gk.length == 3 && Df.length == 5 && Mf.length == 5 && St.length == 4) {
    console.log('you have a validate team');
    res.send('you have a valid team');
  } else {
    console.log('you dont have a validate team');
    res.send('you dont have a valid team');
  }
}

//check if player duplicate
export function checkIfDuplicate(
  checkDuplicate: (array: number[]) => boolean,
  teamPlayer: number[],
  res: Response,
): void {
  if (checkDuplicate(teamPlayer)) {
    res.status(400).send('error you insert the same id twice');
    throw 'you insert the same id twice';
  } else if (teamPlayer.length > 25) {
    throw 'the team can only have 25 players';
  }
}

//validate if bigger than 25
export function validateIfbigger(myId: number[][]): void {
  if (myId[0].length > 25) {
    throw 'the team can only have 25 players';
  }
}

// validate if player exist
export function validateIfExist(playerId: any, myId: number[][], res: Response<any, Record<string, any>>) {
  for (let i = 0; i <= playerId.length; i++) {
    if (myId[0].includes(playerId[i])) {
      res.send('the id allready exist');
      throw 'the id allready exist';
    }
  }
}


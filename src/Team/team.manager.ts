import {
  getCurrentPlayerNumberInRepo,
  getIdofAllPlayersrepo,
  getPlayersId,
  getPlayersNumberInTeamRepo,
  getPossitionOfPlayers,
  updateNumber,
} from './team.repository';
import { Request, Response } from 'express';

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
  const myids: number[] = await getIdofAllPlayersrepo(teamInt);
  return myids;
}

export async function checkifFull(myId:number[][], playerId:number[]) {
  for (let i = 0; i <= playerId.length; i++) {
    if (myId[0].includes(playerId[i])) {
      throw 'the id allready exist';
    }
  }
}

export async function checkIfTeamIsValidate(teamInt:number,_req:Request,res:Response) {
 const getId = Array.from(await getPlayersId(teamInt));

 
 const Gk:string[]=[];
 const Df:string[]=[];
 const Mf:string[]=[];
 const St:string[]=[];
  
    for(let i = 0;i<getId[0].playerlist.length;i++){
      let possitions:string=await getPossitionOfPlayers(getId[0].playerlist[i]);
      console.log(possitions);
      
      
    
     if (possitions=='Gk'){
       Gk.push(possitions)
     }
     else if(possitions=='Df'){
       Df.push(possitions)
     }
     else if(possitions=='Mf'){
       Mf.push(possitions)
     }
     else{
       St.push(possitions)
     }
     console.log(Gk.length + '');
    }
     
      if(Gk.length==3 && Df.length==5 && Mf.length== 5 && St.length==4){
        console.log('you have a validate team');
        res.send('you have a valid team');
        
      }
      else{
        console.log('you dont have a validate team');
        res.send('you dont have a valid team')
        
      }
      
     
      

   
      
   
  
  }


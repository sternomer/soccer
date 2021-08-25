import { Request, Response } from 'express';
import { ITeam } from './team.Interface';
// import  * as  playerManager from './player.manager';
import teamSchema from './team.model';
import {
  getCurrentPlayerNumberInManager,
  getIds,
  getPlayersNumberInTeamManger,
  updatePlayerNumber,
} from './team.manager';
import PlayerSchema from '../Player/player.model';
import { Iplayer } from '../Player/player.interface';

export const postteam = async (req: Request, res: Response) => {
  const teamPlayer: number[] = req.body.playerlist;
  let allnumbers: number[] = [];
  let myid: Iplayer[] = [];
  console.log(teamPlayer.length);
  

  if (teamPlayer.length > 25) {
    throw 'the team can only have 25 players';
  }

  for (let i: number = 0; i < teamPlayer.length; i++) {
    myid.push(await PlayerSchema.findOne({ playerId: teamPlayer[i] }));
    allnumbers.push(myid[i].currentShirtNumber);
    console.log(myid[i]);
  }
  for (let i = 0; i < myid.length; i++) {
    const element = myid[i];
    allnumbers = [];
    myid.forEach((p) => allnumbers.push(p.currentShirtNumber));
   
    

    updatePlayerNumber(element.currentShirtNumber, allnumbers, element.playerId);
  }

  const newteam = new teamSchema({
    teamName: req.body.teamName,
    teamNation: req.body.teamNation,
    teamId: req.body.teamId,
    playerlist: req.body.playerlist,
  });

  try {
    const savedteam = await newteam.save();
    res.json(savedteam);
  } catch (error) {
    res.json({ message: error });
  }
};
// Get all players
export const getteam = async (_req: Request, res: Response) => {
  try {
    const teams: ITeam = await teamSchema.find();
    res.json(teams);
  } catch (err) {
    res.json({ message: err });
  }
};
//get specific team
export const getoneTeam = async (req: Request, res: Response) => {
  try {
    const specteam: ITeam = await teamSchema.find({
      teamId: req.params.teamId,
    });
    res.json(specteam);
  } catch (error) {}
};
//Delete
export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const removeteam = await teamSchema.remove({ teamId: req.params.teamId });
    res.json(removeteam);
  } catch (err) {
    res.json({ message: err });
  }
};
//update
export const addPlayer = async (req: Request, res: Response) => {
  const teamId: string = req.params.teamId;
  const teamInt: number = parseInt(teamId);
  const myId: number[][] = await getIds(teamInt);
  const objOfplayersNumber: { playersNumber: number[] }[] = await getPlayersNumberInTeamManger(teamInt);
  const playersnumber: number[] = objOfplayersNumber[0].playersNumber;
  const playerId = req.body.playerlist;
  const objplayerNumber = await getCurrentPlayerNumberInManager(playerId);
  const playerNumber: number = objplayerNumber;
  // let checkDuplicate =(array) =>new Set(array).size !== array.lenght;
  const currentPlayerid:number= req.body.playerlist;
  const currentPlayer:Iplayer = await PlayerSchema.findOne({playerId:currentPlayerid});
  console.log(myId[0]);
  console.log(playerId);


  if (myId.length > 25) {
    throw 'the team can only have 25 players';
  }
   else if (myId[0].includes(playerId)) {
    throw 'the id allready exist';
  }

  try {
    if (playersnumber.includes(playerNumber)) {
      updatePlayerNumber(currentPlayer.currentShirtNumber, playersnumber, playerId);
    }
    const updateTeam = await teamSchema.updateOne(
      {
        teamId: req.params.teamId,
      },
      { $push: { playerlist: req.body.playerlist } },
    );

    res.json(updateTeam);
  } catch (err) {
    res.json({ message: err });
  }
};

export const checkNumberavailable = async (req: Request, res: Response) => {
  const teamId: string = req.params.teamId;
  const teamInt: number = parseInt(teamId);

  try {
    const playersNumber: number[] = await getPlayersNumberInTeamManger(teamInt);

    res.json(playersNumber);
  } catch (error) {
    throw error;
  }
};
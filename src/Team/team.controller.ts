import { Request, Response } from 'express';
import { ITeam } from './team.Interface';
import teamSchema from './team.model';
import {
  changePlayerNumber,
  checkIfBiggerThan25,
  checkIfIdExistInPut,
  checkIfTeamIsValidate,
  checkPostValidation,
  getCurrentPlayerNumberInManager,
  getIdOfAllteamPlayers,
  getPlayersNumberInTeamManger,
  updateNumberstoPost
} from './team.manager';
import PlayerSchema from '../Player/player.model';
import { Iplayer } from '../Player/player.interface';

export const postteam = async (req: Request, res: Response) => {
  const teamPlayer: number[] = req.body.playerlist;
  let allnumbers: number[] = [];
  let myid: Iplayer[] = [];
  let checkDuplicate = (array) => new Set(array).size !== array.length;

  checkPostValidation(checkDuplicate, teamPlayer, res);

  allnumbers = await updateNumberstoPost(teamPlayer, myid, allnumbers);

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
  const myId: number[][] = await getIdOfAllteamPlayers(teamInt);
  const objOfplayersNumber: { playersNumber: number[] }[] = await getPlayersNumberInTeamManger(teamInt);
  const playersnumber: number[] = objOfplayersNumber[0].playersNumber;
  const playerId = req.body.playerlist;
  const objplayerNumber = await getCurrentPlayerNumberInManager(playerId);
  const playerNumber: number = objplayerNumber;
  const currentPlayerid: number = req.body.playerlist;
  const currentPlayer: Iplayer = await PlayerSchema.findOne({ playerId: currentPlayerid });

  checkIfBiggerThan25(myId);
  checkIfIdExistInPut(playerId, myId, res);

  try {
    changePlayerNumber(playersnumber, playerNumber, currentPlayer, playerId);
    const updateTeam = await teamSchema.updateOne(
      {
        teamId: req.params.teamId,
      },
      { $push: { playerlist: req.body.playerlist } },
    );

    res.json(updateTeam);
  } catch (err) {
    res.send('the player dont exist')
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
export const checkIfTeamIsValidateCon = async (req: Request, _res: Response) => {
  const teamId: string = req.params.teamId;
  const teamInt: number = parseInt(teamId);
  try {
    await checkIfTeamIsValidate(teamInt, req, _res);
  } catch (error) {
    throw error;
  }
};









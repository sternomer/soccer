import { Request, Response } from 'express';
import { Iplayer } from './player.interface';
import { createNewPlayer, gkHeightValidation } from './player.manager';
// import  * as  playerManager from './player.manager';
import PlayerSchema from './player.model';

// post a new player//
export const postPlayer = async (req: Request, res: Response) => {
  try {
    gkHeightValidation(req);

    const savedPlayer = await createNewPlayer(req);
    res.json(savedPlayer);
  } catch (error) {
    res.json({ message: error });
  }
};
// Get all players
export const getPlayers = async (_req: Request, res: Response) => {
  try {
    const players: Iplayer = await PlayerSchema.find();
    res.json(players);
  } catch (err) {
    res.json({ message: err });
  }
};
//get specific Player
export const getonePlayer = async (req: Request, res: Response) => {
  try {
    const specPlayer: Iplayer = await PlayerSchema.findOne({
      PlayerId: req.params.PlayerId,
    });
    res.json(specPlayer);
  } catch (error) {}
};
//Delete
export const deletePlayer = async (req: Request, res: Response) => {
  try {
    const removePlayer = await PlayerSchema.remove({ playerId: req.params.playerId });
    res.json(removePlayer);
  } catch (err) {
    res.json({ message: err });
  }
};
//update
export const updatePlayer = async (req: Request, res: Response) => {
  console.log(req.body);
console.log(req.body.currentShirtNumber);

  try {
    const updatePlayer = await PlayerSchema.updateOne(
      {
        PlayerId: req.params.PlayerId,
      },
      { $set: { currentShirtNumber: req.body.currentShirtNumber } },
    );
    res.json(updatePlayer);
  } catch (err) {
    res.json({ message: err });
  }
};


// 
import express, { Request, Response } from 'express';
import {Iplayer} from './player.interface';
// import  * as  playerManager from './player.manager';
import PlayerSchema from './player.model'


// post a new player//
export const postPlayer = async (req: Request, res: Response) => {
  const{
    firstName ,lastName,playerId,playerNation,playerHeight,defaultShirtNumber, currentShirtNumber,playerPosition 

  }= req.body;
  const newPlayer = new PlayerSchema({
    firstName ,
    lastName,
    playerId,
    playerNation,
    playerHeight,
    defaultShirtNumber,
    currentShirtNumber,
    playerPosition,
  })

  try {
      const savedPlayer = await newPlayer.save();
      res.json(savedPlayer);
  } catch (error) {
      res.json({message:error})
      
  }
}
// Get all players
 export const getPlayers =async (req:Request,res:Response)=>{
    try {
      const players:Iplayer = await PlayerSchema.find();
      res.json(players);
    } catch (err) {
      res.json({ message: err });
    }
  }


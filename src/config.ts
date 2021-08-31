

import * as dotenv from 'dotenv'
dotenv.config();
export const dbName = 'soccerteam';
const MONGPORT = process.env.MONGOPORT;
const MONGOIP = process.env.MONGOIP
export const mongoDbPath =  `mongodb://${MONGOIP}:${MONGPORT}/${dbName}` 
console.log(mongoDbPath);

export const playerCollectionName = 'players';
export const teamCollectionName = 'teams';
export const serverPort = process.env.PORT || 4001;
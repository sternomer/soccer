export const dbName = 'soccerteam';
export const mongoDbPath = `mongodb://localhost:27017/${dbName}`;
export const playerCollectionName = 'players';
export const teamCollectionName = 'teams';
require('dotenv').config();
export const serverPort = process.env.PORT || 4001;
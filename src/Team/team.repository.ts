import teamSchema from './team.model';
import PlayerSchema from '../Player/player.model';

export async function getPlayersNumberInTeamRepo(teamInt: number) {
  return await teamSchema.aggregate([
    {
      $match: {
        teamId: teamInt,
      },
    },
    {
      $lookup: {
        from: 'players',
        localField: 'playerlist',
        foreignField: 'playerId',
        as: 'players',
      },
    },
    {
      $project: {
        playersNumber: '$players.currentShirtNumber',
      },
    },
  ]);
}
export async function getCurrentPlayerNumberInRepo(playerId) {
  return (await PlayerSchema.findOne({ playerId })).currentShirtNumber;
}

export async function updateNumber(playerId, newNumber: number) {
  await PlayerSchema.updateOne({ playerId }, { currentShirtNumber: newNumber });
}

export async function getPlayersId(teamInt: number) {
  return await teamSchema.aggregate([
    {
      $match: {
        teamId: teamInt,
      },
    },
    {
      $project: {
        playerlist: '$playerlist',
      },
    },
  ]);
}

export async function getIdofAllPlayersrepo(teamInt) {
  return (await teamSchema.findOne({ teamInt })).playerlist;
}
export async function getPossitionOfPlayers(playerId) {
  return (await PlayerSchema.findOne({ playerId})).playerPosition;

  
}

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
        foreignField: '_id',
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
//   return await PlayerSchema.aggregate([
//     {
//       $match: {
//         playerId: playerId,
//       },
//     },
//     {
//       $project: {
//         playerNumber: '$currentShirtNumber',
//       },
//     },
//   ]);
// }
export async function updateNumber(playerId, newNumber: number) {
  await PlayerSchema.updateOne({ playerId }, { currentShirtNumber: newNumber });
}

import PlayerSchema from './player.model';
export async function getPlayerNumberInTeamRepo(_teamInt: number) {
  return await PlayerSchema.aggregate([
    {
      $match: {
        playerId: 1234,
      },
    },
    {
      $project: {
        playerNumber: '$currentShirtNumber',
      },
    },
  ]);
}
export function createNewPlayerInRepo(req: any) {
  return new PlayerSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    playerId: req.body.playerId,
    playerNation: req.body.playerNation,
    playerHeight: req.body.playerHeight,
    defaultShirtNumber: req.body.defaultShirtNumber,
    currentShirtNumber: req.body.currentShirtNumber,
    playerPosition: req.body.playerPosition,
  });
}


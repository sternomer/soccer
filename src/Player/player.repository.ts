import PlayerSchema from './player.model'
export async function getPlayerNumberInTeamRepo(_teamInt: number) {
    return await PlayerSchema.aggregate([
        {
          '$match': {
            'playerId': 1234
          }
        }, {
          '$project': {
            'playerNumber': '$currentShirtNumber'
          }
        }
      ])
    }
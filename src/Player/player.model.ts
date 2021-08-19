
import * as config from 'config.ts';
// import playerInterface from './player.interface';
import mongoose, { Model, Schema, Document } from 'mongoose';

const PlayerSchema:Schema =new Schema({
    firstName:
    {type:String,
        index:true},
    lastName:
    {type:String
    },
    playerId:
    {type:Number,
        unique:true},
    playerNation:
    {type:String
    },
    playerHeight:
    {type:Number,min:[165,'the min size is 165 sm']
    ,max:205},
    defaultShirtNumber:
    {type:Number,min:[1,'the numbers starts from one'],max:99
        },
    currentShirtNumber:
    {type:Number,min:[1,'the numbers starts from one'],max:99}
    ,
    playerPosition:
    {type:String,enum:['Gk','Df','Mf',"St"]
        }
  
})
export default mongoose.model('player',PlayerSchema)
import mongoose, { Schema } from 'mongoose';

export const teamSchema: Schema = new Schema(
  {
    teamName: { type: String, index: true },
    teamNation: { type: String },
    teamId: { type: Number, unique: true },
    playerlist: [{ type:Number, ref: 'player' ,unique:true}],
  },
  { versionKey: false },
);
export default mongoose.model('team', teamSchema);

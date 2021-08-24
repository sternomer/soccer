import * as config from './config';
import server from './server';
import mongoose from 'mongoose';

startFunction();

export async function startFunction() {
  mongoose
    .connect(config.mongoDbPath, { useUnifiedTopology: true, useNewUrlParser: true })
    .catch((_err) => {
      console.log("Coudn't connect to MongoDB....");
      process.exit();
    });

  server();
}

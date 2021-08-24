import * as config from './config';
import express from 'express';
import playerRouter from './Player/player.router';
import teamRouter from './Team/team.router'

const PORT = config.serverPort;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/player', playerRouter);

app.use('/team', teamRouter);

function server() {
  app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
  });
}

export default server;

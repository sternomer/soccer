import express from 'express';
import { Application } from 'express';

import playerRouter from './Player/player.router';
// import teamRouter from './src/Team/team.router';

const router = express.Router();

function routers(app: Application) {
    app.use('/player', playerRouter);
    // app.use('/player', groupRouter);
}

export default routers;
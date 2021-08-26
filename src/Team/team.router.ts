import express from 'express';
import * as teamController from './team.controller';

const router = express.Router();

router.post('/', teamController.postteam);
router.get('/', teamController.getteam);
router.get('/:teamId', teamController.getoneTeam);
router.delete('/:teamId', teamController.deleteTeam);
router.put('/:teamId', teamController.addPlayer);
router.get('/checkNum/:teamId', teamController.checkNumberavailable);
router.get('/checkvalid/:teamId', teamController.checkIfTeamIsValidateCon);


export default router;

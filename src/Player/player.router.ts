import express from 'express';
import * as playerController from './player.controller';

const router = express.Router();

router.post('/', playerController.postPlayer);
router.get('/', playerController.getPlayers);
// router.delete('/', playerController.deleteGroup);
// router.put('/name/', playerController.putGroupName);
// router.get('/hierarchy/', playerController.getHierarchy);
// router.get('/searchPerson/', playerController.getIfPersonInGroup);
// router.put('/group/', playerController.putGroupNewGroup);
// router.delete('/group/', playerController.deleteContainingGroup);

export default router;
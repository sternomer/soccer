import express from 'express';
import * as playerController from './player.controller';

const router = express.Router();

router.use(    express.json());
router.post('/', playerController.postPlayer);
router.get('/', playerController.getPlayers);
router.delete('/:playerId', playerController.deletePlayer);
router.put('/:playerId', playerController.updatePlayer);
// router.get('/hierarchy/', playerController.getHierarchy);
router.get('/:playerId', playerController.getonePlayer);
// router.put('/group/', playerController.putGroupNewGroup);
// router.delete('/group/', playerController.deleteContainingGroup);

export default router;
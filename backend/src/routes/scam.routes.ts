import { Router } from 'express';
import * as scamController from '../controllers/scam.controller';

const router = Router();

router.post('/check', scamController.check);
router.get('/reports/:id', scamController.getReport);
router.get('/recent', scamController.getRecent);
router.post('/report', scamController.submitReport);

export default router;

import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as aiController from '../controllers/ai.controller';

const router = Router();

router.post('/chat', authenticate, aiController.chat);
router.post('/suggest', aiController.suggestGuides);
router.post('/explain', aiController.explainConcept);

export default router;

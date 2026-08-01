import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as communityController from '../controllers/community.controller';

const router = Router();

router.get('/questions', communityController.getQuestions);
router.get('/questions/:id', communityController.getQuestion);
router.post('/questions', authenticate, communityController.createQuestion);
router.post('/questions/:id/answers', authenticate, communityController.addAnswer);
router.post('/answers/:id/vote', authenticate, communityController.voteAnswer);
router.post('/answers/:id/accept', authenticate, communityController.acceptAnswer);

export default router;

import { Router } from 'express';
import { authenticate, optionalAuth } from '../middleware/auth';
import * as questionController from '../controllers/question.controller';

const router = Router();

router.get('/', questionController.list);
router.get('/:slug', optionalAuth, questionController.getBySlug);
router.post('/', authenticate, questionController.create);
router.post('/:id/answers', authenticate, questionController.addAnswer);
router.post('/:id/vote', authenticate, questionController.vote);
router.patch('/:id/accept-answer', authenticate, questionController.acceptAnswer);

export default router;

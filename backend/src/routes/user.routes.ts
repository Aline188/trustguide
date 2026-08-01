import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as userController from '../controllers/user.controller';

const router = Router();

router.get('/:id/profile', userController.getProfile);
router.get('/:id/articles', userController.getUserArticles);

export default router;

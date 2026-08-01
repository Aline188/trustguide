import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as bookmarkController from '../controllers/bookmark.controller';

const router = Router();

router.use(authenticate);
router.get('/', bookmarkController.list);
router.post('/', bookmarkController.add);
router.delete('/:articleId', bookmarkController.remove);

export default router;

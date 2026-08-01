import { Router } from 'express';
import { authenticate, authorize, optionalAuth } from '../middleware/auth';
import * as articleController from '../controllers/article.controller';
import { validate } from '../middleware/validate';
import { body } from 'express-validator';

const router = Router();

router.get('/', articleController.list);
router.get('/featured', articleController.getFeatured);
router.get('/trending', articleController.getTrending);
router.get('/:slug', optionalAuth, articleController.getBySlug);
router.get('/:id/related', articleController.getRelated);

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MODERATOR'), [
  body('title').isLength({ min: 10 }),
  body('content').isLength({ min: 50 }),
  body('categoryId').isString(),
  validate,
], articleController.create);

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MODERATOR'), articleController.update);
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), articleController.remove);
router.patch('/:id/status', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), articleController.updateStatus);

export default router;

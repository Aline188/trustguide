import { Router } from 'express';
import * as categoryController from '../controllers/category.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', categoryController.list);
router.get('/:slug', categoryController.getBySlug);
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), categoryController.create);
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), categoryController.update);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), categoryController.remove);

export default router;

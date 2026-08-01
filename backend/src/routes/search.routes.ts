import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as searchController from '../controllers/search.controller';

const router = Router();

router.get('/', searchController.search);
router.get('/suggestions', searchController.suggestions);
router.post('/history', authenticate, searchController.saveHistory);
router.get('/history', authenticate, searchController.getHistory);
router.delete('/history', authenticate, searchController.clearHistory);

export default router;

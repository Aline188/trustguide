import { Router } from 'express';
import * as analyticsController from '../controllers/analytics.controller';

const router = Router();

router.get('/popular-searches', analyticsController.getPopularSearches);
router.get('/popular-articles', analyticsController.getPopularArticles);
router.get('/trending-topics', analyticsController.getTrendingTopics);

export default router;

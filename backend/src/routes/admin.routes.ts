import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import * as adminController from '../controllers/admin.controller';

const router = Router();

router.use(authenticate, authorize('ADMIN', 'SUPER_ADMIN'));

router.get('/dashboard', adminController.getDashboard);
router.get('/users', adminController.getUsers);
router.patch('/users/:id/role', authorize('SUPER_ADMIN'), adminController.updateUserRole);
router.patch('/users/:id/ban', authorize('SUPER_ADMIN', 'ADMIN'), adminController.toggleBanUser);
router.get('/articles', adminController.getArticles);
router.patch('/articles/:id/verify', adminController.verifyArticle);
router.get('/reports', adminController.getReports);
router.patch('/reports/:id/resolve', adminController.resolveReport);
router.get('/analytics', adminController.getAnalytics);

export default router;

import { Router } from 'express';
import * as faqController from '../controllers/faq.controller';

const router = Router();

router.get('/', faqController.list);
router.get('/:id', faqController.getById);

export default router;

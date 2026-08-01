import { Router } from 'express';
import * as contactController from '../controllers/contact.controller';

const router = Router();

router.post('/', contactController.submitMessage);
router.get('/', contactController.listMessages);

export default router;

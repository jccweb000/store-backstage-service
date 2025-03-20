import express from 'express';

import { authMiddleware } from '../../middleware/authToken';
import { add, getListWithPage, update, fetchDetail, fetchAll } from './controller';

const router = express.Router();
router.use(authMiddleware as any);

router.post('/add', add);
router.post('/list', getListWithPage);
router.post('/update', update);
router.get('/:id', fetchDetail);
router.get('/', fetchAll);

export default router;
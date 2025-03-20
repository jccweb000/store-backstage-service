import express from "express";

import { authMiddleware } from '../../middleware/authToken';
import { add, getList  } from './controller';
const router = express.Router();

router.use(authMiddleware as any);

router.post('/add', add);
router.post('/list', getList);

export default router;
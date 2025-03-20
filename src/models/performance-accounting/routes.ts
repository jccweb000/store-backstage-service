import express from 'express';

import { add, fetchList, downloadDepartmentPerformance } from './controller';

const router = express.Router();

router.post('/add', add);
router.post('/list', fetchList);
router.post('/export', downloadDepartmentPerformance);

export default router;

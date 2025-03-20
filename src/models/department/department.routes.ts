import express from 'express';
import {
  addDepartment,
  getAllDepartments,
  getDetail,
  deleteDepartment,
  updateDepartmentInfo,
  getDepartmentsByShopCode
} from './department.controller';
import { authMiddleware } from '../../middleware/authToken';

const router = express.Router();
router.use(authMiddleware as any)

router.post('/add', addDepartment); // 创建部门
router.get('/all', getAllDepartments); // 获取所有部门
router.get('/:id', getDetail);
router.delete("/:id", deleteDepartment);
router.post("/update", updateDepartmentInfo);

router.get('/findListByShopCode/:shopCode', getDepartmentsByShopCode);
export default router;
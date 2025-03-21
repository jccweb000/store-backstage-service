import express from 'express';
import {
  getAllUsers,
  getUser,
  addUser,
  modifyUser,
  removeUser,
  fetchUserList,
  search,
  exportStaffs
} from './controller';
import { authMiddleware } from '../../middleware/authToken';

const router = express.Router();
router.use(authMiddleware as any)

router.get('/:id', getUser); // 根据 ID 获取用户
router.post('/add', addUser); // 创建用户
router.post('/update', modifyUser); // 更新用户
router.get('/delete/:id', removeUser); // 删除用户
router.post('/list', fetchUserList);
router.get('/search', search);
router.post('/export', exportStaffs);
router.get('/', getAllUsers); // 获取所有用户

export default router;
import express from 'express';
import {
  getAllShops,
  getShopList,
  addShop,
  deleteShop,
  findShop,
  update,
  getOrganizationTree
} from './shop.controller';

const router = express.Router();

router.get('/', getAllShops); // 获取所有店铺
router.post('/list', getShopList); // 分页查询
router.post('/add', addShop); // 新增门店
router.delete('/delete/:id', deleteShop);
router.get('/detail', findShop);
router.post('/update', update);
router.get('/tree', getOrganizationTree)

export default router;
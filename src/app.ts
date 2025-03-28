import express, { Request, Response } from 'express';
import cors from 'cors';

import userRoutes from './models/staff/routes';
import shopRoutes from './models/shop/shop.routes'; 
import loginRoutes from './models/user/routes';
import departmentRoutes from './models/department/department.routes';
import commodityRouter from './models/commodity/routes';
import PerformanceRouter from './models/performance/routers';
import DepartmentPerformanceRouter from './models/performance-accounting/routes';
import connectDB from './db';

const app = express();

// 解析 JSON 请求体
app.use(express.json());
// 允许跨域
app.use(cors());

// 注册路由
app.use('/backstage/staff', userRoutes); // 用户模块路由
app.use('/backstage/shops', shopRoutes); // 店铺路由
app.use('/backstage/user', loginRoutes);
app.use('/backstage/departments', departmentRoutes)
app.use('/backstage/commodity', commodityRouter); // 商品路由
app.use('/backstage/performance', PerformanceRouter);
app.use('/backstage/departmentPerformance', DepartmentPerformanceRouter);
app.use('/*', (req: Request, res: Response) => {
  res.status(404).send({
    code: 404,
    message: '404'
  })
})
// 连接数据库
connectDB();

export default app;
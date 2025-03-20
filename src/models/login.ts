import express from 'express';
import { userLogin } from './user/controller';

const router = express.Router();

router.post('/', userLogin); // 登陆

export default router;

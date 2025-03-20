import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { findUser } from './service';
 
const JWT_SECRET = 'my-secret-key';


export const userLogin = async (req: Request, res: Response) => {
  try {
    
    const { account, password } = req.body;
    
    const user = await findUser(account);
    if (!user || user.password !== password) {
      res.status(401).json({
        code: 401,
        message: 'xxx'
      })
    }

    // 生成 JWT
    const token = jwt.sign({ userId: user!.id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      code: 200,
      username: user!.name,
      token
    });
  } catch (error) {
    res.status(401).json({
      code: 401,
      message: 'xxx'
    })
  }
}
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'my-secret-key'; // 替换为你的密钥

/**
 * 登录验证中间件
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 从请求头中获取 token
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // 验证 token
    jwt.verify(token, JWT_SECRET, (error, _) => {
      if (error) {
        return res.status(401).json({ message: 'Access denied. No token provided.xxx' });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
}
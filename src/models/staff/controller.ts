import { Request, Response } from 'express';

import { getStaffs, getStaffById, createStaff, updateStaff, deleteStaff, getStaffByPhoneNumber, getStaffCount, getStaffsByShopCode, searchStaffs } from './service';
import { getShops } from '../shop/shop.service';
import { getAllDepartment } from '../department/department.service';
import { generateExcel } from '../../utils/generate-xlsx';

const JWT_SECRET = 'my-secret-key';

/**
 * 获取所有用户
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getStaffs();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

/**
 * 根据用户 ID 获取用户
 */
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await getStaffById(req.params.id);
    if (user) {
      res.status(200).json({
        code: 200,
        data: user
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

/**
 * 创建新用户
 */
export const addUser = async (req: Request, res: Response) => {
  try {
    const newUser = await createStaff(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

/**
 * 更新用户
 */
export const modifyUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateStaff(req.body);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

/**
 * 删除用户
 */
export const removeUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await deleteStaff(req.params.id);
    if (deletedUser) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

/**
 * 根据店铺code查询员工
 */
export const fetchUserList = async (req: Request, res: Response) => {
  try {
    const { shopCode, pageNumber, pageSize } = req.body;
    
    const query = shopCode ? {
      $or: [{ shopCode }]
    } : {};
    const allUsers = await getStaffsByShopCode(query, { pageNumber, pageSize });
    const shops = await getShops();
    const departments = await getAllDepartment();
    allUsers.forEach(user => {
      const shop = shops.find(shop => shop.shopCode === user.shopCode);
      const department = departments.find(department => department.code === user.departmentCode);
      user.departmentName = department?.name;
      user.shopName = shop?.shopName;
    });
    const count = await getStaffCount(query);
    res.status(200).json({
      count,
      list: allUsers,
      pageNumber,
      pageSize
    })
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: '参数有误'
    })
  }
}

export const search = async (req: Request, res: Response) => {
  try {
    const users = await searchStaffs(req.query);
    res.status(200).json({
      code: 200,
      data: users
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: JSON.stringify(error)
    })
  }
}

/**
 * 导出员工
 */
export const exportStaffs = async (req: Request, res: Response) => {
  try {
    const users = await getStaffs('name phoneNumber');
    // console.log('users', users);
    // const data = [];
    // const headers = ['序号', '姓名', '手机号'];
    // data.push(headers);
    // users.forEach((user, index) => {
    //   data.push([index + 1, user.name, user.phoneNumber]);
    // });
    const data = users.map((user) => {
      return {
        '姓名': user.name,
        '手机号': user.phoneNumber
      }
    });
    const buffer = await generateExcel(data, 'staffs');
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
    res.status(200).send(buffer);
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: JSON.stringify(error)
    })
  }
}
import { Request, Response } from 'express';
import { createDepartment, getAllDepartment, getDepartmentById, dropDepartment, updateDepartment, findDepartmentsByShopCode } from './department.service';
import { findShopByCode } from '../shop/shop.service';

export const addDepartment = async (req: Request, res: Response) => {
  try {
    const newDepartment = await createDepartment(req.body);
    res.status(200).json({
      code: 200,
      message: '创建成功',
      data: newDepartment
    })
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: JSON.stringify(error)
    })
  }
}

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const allDepartments = await getAllDepartment();
    res.status(200).json({
      data: allDepartments
    })
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: JSON.stringify(error)
    })
  }
}

export const getDetail = async (req: Request, res: Response) => {
  try {
    const detail = await getDepartmentById(req.params.id);
    if (detail?.shopCode) {
      const shop = await findShopByCode(detail.shopCode);
      detail.shopName = shop?.shopName;
    }
    res.status(200).json({
      code: 200,
      data: detail
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: JSON.stringify(error)
    })
  }
}

export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const department = await dropDepartment(req.params.id);
    res.status(200).json({
      code: 200,
      data: department
    })
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: JSON.stringify(error)
    })
  }
}

export const updateDepartmentInfo = async (req: Request, res: Response) => {
  console.log('===>', req.body);
  
  try {
    const department = await updateDepartment(req.body);
    res.status(200).json({
      code: 200,
      data: department
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: JSON.stringify(error)
    })
  }
}

export const getDepartmentsByShopCode = async (req: Request, res: Response) => {
  try {
    const departments = await findDepartmentsByShopCode(req.params.shopCode);
    res.status(200).json({
      code: 200,
      data: departments
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: JSON.stringify(error)
    })
  }
}

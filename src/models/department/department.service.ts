import { v4 } from 'uuid';
import Department from './department.model';
import { findShopByCode } from '../shop/shop.service';

export const getAllDepartment = async () => {
  return await Department.find();
}

export const createDepartment = async (params: { name: string; shopCode: string }) => {
  const { name, shopCode } = params;
  const shop = await findShopByCode(shopCode);

  const data = {
    name,
    code: v4(),
    shopCode,
    createTime: new Date().valueOf(),
    shopName: shop?.shopName,
  }
  const newDepartment = new Department(data);
  return await newDepartment.save();
}

export const getDepartmentById = async (id: string) => {
  return await Department.findOne({ code: id });
}

export const dropDepartment = async (id: string) => {
  return await Department.findOneAndDelete({ code: id });
}

export const updateDepartment = async (params: { name: string; code: string; shopCode: string }) => {
  return await Department.findOneAndUpdate({ code: params.code }, params)
}

export const findDepartmentsByShopCode = async (shopCode: string) => {
  return await Department.find({ shopCode });
}
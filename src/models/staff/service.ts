import Staff from './model';
import Shop from '../shop/shop.model';
import Department from '../department/department.model';
import { v4 } from 'uuid';

/**
 * 获取所有用户
 */
export const getStaffs = async (select?: string) => {
  if (select) {
    return await Staff.find().select(select);
  }
  return await Staff.find();
};

/**
 * 根据用户 ID 获取用户
 * @param id 用户 ID
 */
export const getStaffById = async (id: string) => {
  return await Staff.findOne({ id });
};

/**
 * 创建新用户
 * @param Staff 用户数据
 */
export const createStaff = async (staff: any) => {
  const { shopCode, departmentCode } = staff;
  const shop = await Shop.findOne({ shopCode });
  const department = await Department.findOne({ code: departmentCode });
  const newStaff = new Staff({
    ...staff,
    shopName: shop?.shopName,
    departmentName: department?.name,
    createTime: new Date().valueOf(),
    password: staff.password || '123456',
    id: v4(),
  });
  return await newStaff.save();
};

/**
 * 更新用户
 * @param id 用户 ID
 * @param Staff 更新的用户数据
 */
export const updateStaff = async (data: any) => {
  const { id, ...restProps } = data;
  return await Staff.findOneAndUpdate({ id }, restProps, { new: true });
};

/**
 * 删除用户
 * @param id 用户 ID
 */
export const deleteStaff = async (id: string) => {
  return await Staff.findOneAndDelete({ id });
};

export const getStaffByPhoneNumber = async (phoneNumber: string) => {
  return await Staff.findOne({ phoneNumber })
}

/**
 * 根据shopCode查询员工
 */
export const getStaffsByShopCode = async (query: any, page: { pageNumber: number, pageSize: number }) => {
  const { pageNumber, pageSize } = page;
  const skipNumber = (pageNumber - 1) * pageSize;
  return await Staff.find(query).skip(skipNumber).limit(pageSize);
}

export const getStaffCount = async (params: any) => {
  return await Staff.countDocuments(params);
}

export const searchStaffs = async (query: { name?: string }) => {
  return await Staff.find(query);
}
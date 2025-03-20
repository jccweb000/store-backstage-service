import { v4 } from "uuid";

import Shop, { IShop } from './shop.model';
import { Page } from '../type';

/**
 * 获取店铺及下面的人员
 */

export const getShops = async () => {
  return await Shop.find();
}

export const getShopsWithPage = async (page: Page) => {
  const { pageNumber, pageSize } = page;
  const skipNumber = (pageNumber - 1) * pageSize;
  return await Shop.find().select('-users').skip(skipNumber).limit(pageSize);
}

export const getShopsCount = async () => {
  return await Shop.countDocuments();
}

export const createShop = async (params: Omit<IShop, 'shopCode' | 'createTime'>) => {
  const data = {
    ...params,
    shopCode: v4(),
    createTime: new Date().valueOf(),
  }
  const newShop = new Shop(data);
  return await newShop.save();
}

export const dropShop = async (code: string) => {
  return await Shop.findOneAndDelete({ shopCode: code });
}

export const findShopByCode = async (code: string) => {
  return await Shop.findOne({ shopCode: code });
}

export const findAndUpdate = async (params: IShop) => {
  return await Shop.findOneAndReplace({ shopCode: params.shopCode }, params, { new: true })
}
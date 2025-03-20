import Commodity from './model';
import { v4 } from 'uuid';

export const getAllCommodity = async () => {
  return await Commodity.find().select('-_id');
}

export const createCommodity = async ({ name, price, sellPrice }: { name: string; price: number; sellPrice?: number }) => {
  const data = {
    id: v4(),
    name,
    price,
    sellPrice: sellPrice || price,
    createTime: new Date().valueOf(),
    status: 'normal'
  };
  const commodity = new Commodity(data);
  return await commodity.save();
}

export const getAmount = async (query: Record<string, any>) => {
  return await Commodity.countDocuments(query || {});
}

export const getCommodityWithPage = async ({ pageSize, pageNumber, query }: { pageSize: number; pageNumber: number; query?: Record<string, any> }) => {
  const skipNumber = (pageNumber - 1) * pageSize;
  return await Commodity.find(query || {}).skip(skipNumber).limit(pageSize);
}

export const updateCommodity = async (id: string, params: any) => {
  return await Commodity.findOneAndUpdate({ id }, { ...params, updateTime: new Date().valueOf() })
}

export const getDetail = async (id: string) => {
  return await Commodity.findOne({ id });
}
// TODO: update \ delete
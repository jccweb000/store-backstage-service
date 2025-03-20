import { v4 } from 'uuid';

import Performance from './model';

const generateQuery = (query?: Record<string, any>) => {
  if (!query || !Object.keys(query)?.length) return {};
  const { keyword, belongDate, departmentCode, status } = query || {};
  const list = [];
  if (belongDate) {
    // 将日期转换为时间戳范围
    const startOfDay = new Date(belongDate).getTime(); // 当天 00:00:00 的时间戳
    const endOfDay = startOfDay + 24 * 60 * 60 * 1000; // 当天 23:59:59 的时间戳

    list.push({ belongDate: { $gte: startOfDay, $lt: endOfDay }});
  }
  if (keyword) {
    list.push({ staffName: { $regex: new RegExp(keyword, 'i') }});
  }
  if (departmentCode) {
    list.push({ departmentCode: { $eq: departmentCode }});
  }
  if (status) {
    list.push({ status: { $eq: status }})
  }
  const _query = {
    $and: list
  }
  return _query;
}

export const createPerformance = async (params: any) => {
  const data = new Performance({
    id: v4(),
    createTime: new Date().valueOf(),
    ...params
  });
  return await data.save();
}

export const getListWithPage = async ({ pageSize, pageNumber, query }: { pageSize: number; pageNumber: number; query?: Record<string, any> }) => {
  const skipNumber = (pageNumber - 1) * pageSize;
  const _query = generateQuery(query);
  return await Performance.find(_query).sort({ createTime: -1 }).skip(skipNumber).limit(pageSize);
}

export const fetchAmount = async (query?: Record<string, any>) => {
  const _query = generateQuery(query);
  return await Performance.countDocuments(_query);
}


/** 根据条件查所有的单据 */
export const queryDocuments = async (query?: Record<string, any>) => {
  return await Performance.find();
}
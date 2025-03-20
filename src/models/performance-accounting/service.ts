import { v4 } from 'uuid';
import dayjs from 'dayjs';

import DepartmentPerformance from './model';
import PerformanceSchema from '../performance/model';
import { generateExcel } from '../../utils/generate-xlsx';

export const getList = async (query: any, page: { pageNumber: number, pageSize: number }) => {
  const { pageNumber, pageSize } = page;
  const skipNumber = (pageNumber - 1) * pageSize;
  return await DepartmentPerformance.find(query).sort({ createTime: -1 }).skip(skipNumber).limit(pageSize);
}

export const getStaffCount = async (params: any) => {
  return await DepartmentPerformance.countDocuments(params);
}

export const create = async (params: { departmentCode: string, dateRange: [number, number], name: string }) => {
  const { departmentCode, dateRange, name } = params;
  const performances = await PerformanceSchema.find({ departmentCode, belongDate: { $gte: dateRange[0], $lte: dateRange[1] }, status: 'NotAccount' });
  const groupedData = performances.reduce((acc, performance) => {
    const { staffId, staffName, departmentName, shopName, amount } = performance;
    if (!acc[staffId]) {
      acc[staffId] = {
        id: staffId,
        name: staffName,
        departmentName,
        shopName,
        totalAmount: amount,
      }
    } else {
      acc[staffId].totalAmount += amount;
    }
    return acc;
  }, {} as any);

  const result = Object.values(groupedData) as any[];
  const data = new DepartmentPerformance({
    id: v4(),
    createTime: new Date().valueOf(),
    name,
    departmentCode,
    departmentName: result[0]!.departmentName,
    dateRange,
    staffPerformances: result,
  });
  const newData = await data.save();
  // 更新单据状态
  const performanceIds = performances.map(item => item.id);
  await PerformanceSchema.updateMany({ id: {$in: performanceIds} }, { $set: { status: 'Accounted' }});
  return newData;
}

export const exportDepartmentPerformance = async (id: string) => {
  const data = await DepartmentPerformance.findOne({ id });
  const { dateRange, departmentName, staffPerformances, name } = data!;
  const _date = `${dayjs(dateRange[0]).format('YYYY-MM-DD')} - ${dayjs(dateRange[1]).format('YYYY-MM-DD')}`;

  const _data = staffPerformances.map((item, index) => ({
    '序号': index,
    '日期': _date,
    '预定部门': departmentName,
    '预定人': item.name,
    '业绩': item.totalAmount,
  }));

  const buffer = await generateExcel(_data, name);
  return buffer;
}
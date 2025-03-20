import { Request, Response } from "express";
import dayjs from "dayjs";

import { create, getList, getStaffCount, exportDepartmentPerformance } from './service';
import DepartmentPerformance from "./model";
import { generateExcel } from '../../utils/generate-xlsx';

export const add = async (req: Request, res: Response) => {
  try {
    const data = await create(req.body);
    
    res.send({
      code: 200,
      data
    })
  } catch (err) {
    res.send(JSON.stringify(err))
  }
}

export const fetchList = async (req: Request, res: Response) => {
  const { pageNumber, pageSize, ...query } = req.body;
  try {
    const data = await getList(query, { pageNumber, pageSize });
    const count = await getStaffCount(query);
    res.json({
      list: data,
      count
    })
  } catch (err) {}
}


export const downloadDepartmentPerformance = async (req: Request, res: Response) => {
  const data = await DepartmentPerformance.findOne({ id: req.body.id });
  const { dateRange, departmentName, staffPerformances, name } = data!;
  const _date = `${dayjs(dateRange[0]).format('YYYY-MM-DD')} ~ ${dayjs(dateRange[1]).format('YYYY-MM-DD')}`;

  const _data = staffPerformances.map((item, index) => ({
    '序号': index + 1,
    '日期': _date,
    '预定部门': departmentName,
    '预定人': item.name,
    '业绩(元)': item.totalAmount,
  }));

  const buffer = await generateExcel(_data, name);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=accounting.xlsx`);
  res.status(200).send(buffer);
}
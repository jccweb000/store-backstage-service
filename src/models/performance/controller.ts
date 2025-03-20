import { Request, Response } from "express";

import { createPerformance, getListWithPage, fetchAmount } from './service';

export const add = async (req: Request, res: Response) => {
  try {
    const data = await createPerformance(req.body);
    res.status(200).json({
      code: 200,
      data
    })
  } catch (error) {
    res.send(JSON.stringify(error))
  }
}

export const getList = async (req: Request, res: Response) => {
  try {
    const { pageNumber, pageSize, ...query } = req.body;
    
    const list = await getListWithPage({ pageNumber, pageSize, query });
    const count = await fetchAmount(query);
    res.status(200).json({
      list,
      pageNumber,
      pageSize,
      count
    })
  } catch (error) {
    res.send(JSON.stringify(error))
  }
}
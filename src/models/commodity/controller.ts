import { Request, Response } from 'express';

import { createCommodity, getCommodityWithPage, getAmount, updateCommodity, getDetail, getAllCommodity } from './service';

export const add = async (req: Request, res: Response) => {
  const { name, price, sellPrice } = req.body;
  try {
    const newCommodity = await createCommodity({ name, price, sellPrice });
    if (newCommodity) {
      res.status(200).json({
        code: 200,
        data: newCommodity
      })
    }
  } catch (err) {
    res.json({
      message: JSON.stringify(err)
    })
  }
}

export const getListWithPage = async (req: Request, res: Response) => {
  const { pageNumber, pageSize, ...query } = req.body;
  try {
    const list = await getCommodityWithPage({ pageNumber, pageSize, query });
    const count = await getAmount(query);
    res.status(200).json({
      list,
      pageNumber,
      pageSize,
      count
    })
  } catch (error) {
    res.json({
      message: JSON.stringify(error)
    })
  }
}

export const update = async (req: Request, res: Response) => {
  const { id , ...restParams } = req.body;
  try {
    const data = await updateCommodity(id, restParams);
    res.status(200).json({
      code: 200,
      data
    })
  } catch (error) {
    res.json({
      message: JSON.stringify(error)
    })
  }
}

export const fetchDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const detail = await getDetail(id);
    res.status(200).json({
      code: 200,
      data: detail
    })
  } catch (error) {
    res.json({
      message: JSON.stringify(error)
    })
  }
}

export const fetchAll = async (req: Request, res: Response) => {
  try {
    const data = await getAllCommodity();
    res.status(200).json({
      code: 200,
      data
    })
  } catch (error) {
    res.json({
      message: JSON.stringify(error)
    })
  }
}
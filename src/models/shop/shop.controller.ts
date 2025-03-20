import { Request, Response } from 'express';
import { getShops, getShopsWithPage, getShopsCount, createShop, dropShop, findShopByCode, findAndUpdate } from './shop.service';
import Shop from './shop.model';
import Department from '../department/department.model';
import User from '../staff/model';

/**
 * 获取所有门店及门店下的用户
 */
export const getAllShops = async (req: Request, res: Response) => {
  try {
    const shops = await getShops();
    res.status(200).json({
      code: 200,
      data: shops
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

export const getShopList = async (req: Request, res: Response) => {
  try {
    const { pageNumber, pageSize } = req.body;
    const list = await getShopsWithPage({ pageNumber, pageSize });
    const count = await getShopsCount();
    res.status(200).json({
      list,
      pageNumber,
      pageSize,
      count
    })
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: 'xxxx'
    })
  }
}

export const addShop = async (req: Request, res: Response) => {
  try {
    const { shopName, address, ...rest } = req.body
    
    if (!shopName) {
      res.status(400).json({
        code: 400,
        message: '名称必填'
      });
    } else {
      const newShop = await createShop({
        shopName,
        address,
        ...rest
      });
      res.status(200).json({
        code: 200,
        data: newShop
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: JSON.stringify(error)
    })
  }
}

export const deleteShop = async (req: Request, res: Response) => {
  try {
    const delShop = await dropShop(req.params.id);
    if (delShop) {
      res.status(200).json({
        code: 200,
        data: delShop
      })
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: JSON.stringify(error)
    })
  }
}

export const findShop = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    if (!code) {
      res.status(400).json({
        code: 400,
        message: '请传入正确的店铺编码'
      })
    } else {
      const shop = await findShopByCode(code as string);
      res.status(200).json({
        data: shop
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: JSON.stringify(error)
    })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const shop = await findAndUpdate(req.body);
    res.status(200).json({
      data: shop
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: JSON.stringify(error)
    })
  }
}

/**
 * 查询整个组织树
 */
export const getOrganizationTree = async (req: Request, res: Response) => {
  try {
    // 查询所有 shops
    const shops = await Shop.find().select('-users');

    // 遍历 shops，查询关联的 departments 和 users
    const organizationTree = await Promise.all(
      shops.map(async (shop) => {
        // 查询当前 shop 的所有 departments
        const departments = await Department.find({ shopCode: shop.shopCode });

        // 遍历 departments，查询关联的 users
        const departmentsWithUsers = await Promise.all(
          departments.map(async (department) => {
            // 查询当前 department 的所有 users
            const users = await User.find({ departmentCode: department.code });

            return {
              ...department.toObject(), // 将 Mongoose 文档转换为普通对象
              users,
            };
          }),
        );

        return {
          ...shop.toObject(), // 将 Mongoose 文档转换为普通对象
          departments: departmentsWithUsers,
        };
      }),
    );

    res.status(200).json({
      code: 200,
      data: organizationTree
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching organization tree', error });
  }
};
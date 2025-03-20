import { Schema, model } from 'mongoose';

// 定义用户模型
const shopSchema = new Schema({
  shopName: { type: String, required: true, unique: true },
  address: { type: String, required: false },
  icon: { type: String, required: false },
  shopCode: { type: String, required: true },
  users: { type: [], required: true, default: [] },
  createTime: { type: Number, required: true },
  phoneNumber: { type: String }
});

// 创建模型
const Shop = model('Shop', shopSchema);

export default Shop;

export interface IShop {
  shopName: string;
  address?: string;
  phoneNumber?: string;
  icon?: any;
  shopCode: string;
  users?: any
}

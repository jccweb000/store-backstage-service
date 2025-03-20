import { Schema, model } from 'mongoose';

// 模型
const staffSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  age: { type: Number, required: false },
  icon: { type: String, required: false },
  shopCode: { type: String, required: true },
  shopName: { type: String },
  departmentCode: { type: String, required: true },
  departmentName: { type: String },
  createTime: { type: Number, required: true },
  remark: { type: String, required: false },
});

// 创建模型
const Staff = model('staff', staffSchema);

export default Staff;
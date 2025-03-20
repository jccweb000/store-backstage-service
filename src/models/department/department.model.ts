import { Schema, model } from "mongoose";

const departmentSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  shopCode: { type: String, required: true },
  shopName: { type: String },
  createTime: { type: Number, required: true }
});

const Department = model('department', departmentSchema);

export default Department;
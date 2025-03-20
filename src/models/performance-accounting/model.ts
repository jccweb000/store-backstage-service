/** 部门单据 */
import { Schema, model } from "mongoose";

const departmentPerformanceSchema = new Schema({
  id: { type: String, required: true },
  createTime: { type: Number, required: true },
  name: { type: String, required: true },
  departmentCode: { type: String, required: true },
  departmentName: { type: String, required: true },
  dateRange: { type: [Number, Number], required: true },
  staffPerformances: { 
    type: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    totalAmount:{ type: String, required: true, default: 0 },
    /** 提成比例 */
    // rate: { type: String, required: true, default: 1 },
    realAmount: { type: String, required: true, default: 0 },
    remark: { type: String },
  }],
  required: true,
  default: []
}
});

const DepartmentPerformance = model('departmentPerformance', departmentPerformanceSchema);

export default DepartmentPerformance;

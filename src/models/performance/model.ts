import { Schema, model } from 'mongoose';

const PerformanceSchema = new Schema({
  id: { type: String, required: true },
  staffId: { type: String, required: true },
  staffName: { type: String },
  departmentCode: { type: String, required: true },
  departmentName: { type: String },
  shopCode: { type: String, required: true },
  shopName: { type: String },
  /** 商品信息 */
  commodities: { type: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    sellPrice: { type: Number, required: true },
    num: { type: Number, required: true }
  }], required: true },
  amount: { type: Number },
  belongDate: { type: Number, required: true },
  createTime: { type: Number, required: true },
  remark: { type: String },
  status: { type: String, required: true, default: 'NotAccount' }, // Accounted: 已核算；NotAccount: 未核算; Voided: 已作废；
});

const Performance = model('performance', PerformanceSchema);

export default Performance;

interface StaffPerformance {
  // 员工id
  id: string;
}
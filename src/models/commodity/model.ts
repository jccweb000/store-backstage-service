import { Schema, model } from 'mongoose';

const CommoditySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sellPrice: { type: Number, required: true },
  createTime: { type: Number, required: true },
  updateTime: { type: Number },
  status: { type: String }
});

const Commodity = model("Commodity", CommoditySchema);

export default Commodity;
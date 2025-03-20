import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  id: { type: String, required: true },
  account: { type: String, required: true },
  password: { type: String, required: true, default: '123456' },
  name: { type: String },
  role: { type: [String], required: true, default: ['admin'] }
});

const User = model('User', UserSchema);

export default User;
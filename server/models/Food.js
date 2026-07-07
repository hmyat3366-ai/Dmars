import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  old_price: { type: Number },
  category: { type: String, default: '' },
  img: { type: String, default: '' },
  sold: { type: String, default: '0' },
  tags: [{ type: String }],
  toppings: [{ type: String }],
  fbt: [{ type: String }],
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Food', foodSchema);

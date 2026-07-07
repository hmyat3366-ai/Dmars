import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true }, // custom ID like ORD-1234
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user_email: { type: String, required: true },
  items: { type: Array, default: [] },
  subtotal: { type: Number, default: 0 },
  delivery_fee: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  status: { type: String, default: 'Processing' },
  delivery_address: { type: Object, default: {} },
  payment_method: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);

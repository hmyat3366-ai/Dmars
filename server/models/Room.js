import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, default: '' },
  type: { type: String, default: '' },
  bedrooms: { type: Number, default: 1 },
  amenities: [{ type: String }],
  img: { type: String, default: '' },
  description: { type: String, default: '' },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Room', roomSchema);

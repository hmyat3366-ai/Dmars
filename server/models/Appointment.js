import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  id: { type: String, required: true }, // custom ID like APT-1234
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user_email: { type: String, required: true },
  room: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);

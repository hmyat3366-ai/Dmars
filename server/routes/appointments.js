import express from 'express';
import Appointment from '../models/Appointment.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get ALL appointments (admin)
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get user appointments
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user_id: req.user.id }).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create an appointment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newAppointment = new Appointment({
      ...req.body,
      user_id: req.user.id
    });
    const appointment = await newAppointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update appointment status
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { id: req.params.id }, 
      { status: req.body.status }, 
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;

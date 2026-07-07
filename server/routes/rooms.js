import express from 'express';
import Room from '../models/Room.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a room
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newRoom = new Room({
      ...req.body,
      owner_id: req.user.id
    });
    const room = await newRoom.save();
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a room
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Room removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;

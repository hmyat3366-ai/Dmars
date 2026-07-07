import express from 'express';
import Food from '../models/Food.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get all foods
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a food
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newFood = new Food({
      ...req.body,
      owner_id: req.user.id
    });
    const food = await newFood.save();
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a food
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;

import express from 'express';
import Order from '../models/Order.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get ALL orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get user orders
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create an order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      user_id: req.user.id
    });
    const order = await newOrder.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update order status
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { id: req.params.id }, 
      { status: req.body.status }, 
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;

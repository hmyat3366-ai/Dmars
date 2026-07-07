import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: payload });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    if (user.role !== role && role) {
      return res.status(400).json({ message: `This account is registered as "${user.role}", not "${role}".` });
    }

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: payload });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/social', async (req, res) => {
  // Social login placeholder logic. Since MongoDB requires custom OAuth handling,
  // this is a mock that would create a user if they don't exist based on email.
  try {
    const { email, name, role } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        password: 'social-login-no-password', // Placeholder
        role: role || 'Customer'
      });
      await user.save();
    }
    
    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    };
    
    jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: payload });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

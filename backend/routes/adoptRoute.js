import express from 'express';

import { Adopt } from '../models/adoptModel.js';

const router = express.Router();

// Middleware to parse incoming form data
router.use(express.urlencoded({ extended: false }));





// Validation middleware
const validateAdopt = (req, res, err , next) => {
  const adopts = new Adopt(req.body);
  const validationErrors = adopts.validateSync();
  if (validationErrors) {
    const errors = Object.values(validationErrors.errors).map(err => err.message);
    return res.status(400).json({ message: 'Validation failed', errors });
  }
  next();
};

// POST route to create a new adopt with image upload
router.post('/', validateAdopt, async (req, res) => {
  try {
    let adoptData = { ...req.body };
    console.log(adoptData);
    const adopt = new Adopt(adoptData);
    const savedAdopt = await adopt.save();
    res.status(201).json({ message: 'Adopt information submitted successfully', adopt: savedAdopt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Other routes for CRUD operations...
router.get('/', async (req, res) => {
  try {
    const adopts = await Adopt.find();
    res.status(200).json({ message: 'Adopts retrieved successfully', count: adopts.length, data: adopts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const adopt = await Adopt.findById(id);
    if (!adopt) {
      return res.status(404).json({ message: 'Adopt not found' });
    }
    res.status(200).json({ message: 'Adopt retrieved successfully', adopt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', validateAdopt, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const adopt = await Adopt.findById(id);
    if (!adopt) {
      return res.status(404).json({ message: 'Adopt not found' });
    }
    adopt.set(updateData);
    const updatedAdopt = await adopt.save();
    res.status(200).json({ message: 'Adopt updated successfully', adopt: updatedAdopt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const adopt = await Adopt.findByIdAndDelete(id);
    if (!adopt) {
      return res.status(404).json({ message: 'Adopt not found' });
    }
    res.status(200).json({ message: 'Adopt deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const adopt = await Adopt.findById(id);
    if (!adopt) {
      return res.status(404).json({ message: 'Adopt not found' });
    }
    adopt.status = 'Approved';
    const updatedAdopt = await adopt.save();
    res.status(200).json({ message: 'Adopt status updated successfully', adopt: updatedAdopt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

export default router;

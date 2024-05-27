import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import { Volunteer } from '../models/volunteerModel.js';

const router = express.Router();

// Middleware to parse incoming form data
router.use(express.urlencoded({ extended: false }));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./volunteer_uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Validation middleware
const validateVolunteer = (req, res, next) => {
  const volunteers = new Volunteer(req.body);
  const validationErrors = volunteers.validateSync();
  if (validationErrors) {
    const errors = Object.values(validationErrors.errors).map(err => err.message);
    return res.status(400).json({ message: 'Validation failed', errors });
  }
  next();
};

// POST route to create a new volunteer with image upload
router.post('/', upload.single('volunteerImage'), validateVolunteer, async (req, res) => {
  try {
    let volunteerData = { ...req.body };

    if (req.file) {
      volunteerData.volunteerImage = "/volunteer_uploads/" + req.file.filename;
      console.log("File uploaded:", req.file);
    } else {
      return res.status(400).json({ message: 'Volunteer image is required' });
    }

    const volunteer = new Volunteer(volunteerData);
    const savedVolunteer = await volunteer.save();
    res.status(201).json({ message: 'Volunteer information submitted successfully', volunteer: savedVolunteer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Other routes for CRUD operations...
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.status(200).json({ message: 'Volunteers retrieved successfully', count: volunteers.length, data: volunteers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const volunteer = await Volunteer.findById(id);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.status(200).json({ message: 'Volunteer retrieved successfully', volunteer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', validateVolunteer, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const volunteer = await Volunteer.findById(id);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    volunteer.set(updateData);
    const updatedVolunteer = await volunteer.save();
    res.status(200).json({ message: 'Volunteer updated successfully', volunteer: updatedVolunteer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const volunteer = await Volunteer.findByIdAndDelete(id);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    if (volunteer.volunteerImage) {
      const imagePath = `./${volunteer.volunteerImage}`;
      console.log("Deleting image at path:", imagePath);
      await fs.unlink(imagePath);
    }
    res.status(200).json({ message: 'Volunteer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const volunteer = await Volunteer.findById(id);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    volunteer.status = 'Approved';
    const updatedVolunteer = await volunteer.save();
    res.status(200).json({ message: 'Volunteer status updated successfully', volunteer: updatedVolunteer });
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

import express from 'express';
import multer from 'multer';
import fs from 'fs/promises'; // Import the promises version of the fs module
import { Donate } from '../models/donateModel.js';

const router = express.Router();

// Middleware to parse incoming form data
router.use(express.urlencoded({ extended: false }));


// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null,"./shelter_uploads"); // Absolute path
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`); // Keep the original file name
  }
});


const upload = multer({ storage });
  


// Validation middleware
const validateDonation = (req, res, next) => {
  const donation = new Donate(req.body);
  const validationErrors = donation.validateSync();
  if (validationErrors) {
    const errors = Object.values(validationErrors.errors).map(err => err.message);
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  // Check if petImage field exists
 

  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
};

// POST route to create a new donation with image upload
router.post('/', upload.single('petImage'), validateDonation, async (req, res) => {
  try {
    
    let donationData = { ...req.body };

    if (req.file) {
      // Set the path of the uploaded image relative to the server root
      donationData.petImage = "/shelter_uploads/" + req.file.filename;
      console.log(req.body);
  } else {
      donationData.petImage = null; // Or set it to some default value
      //console.log(req.body);
    
    }
  

    const donation = new Donate(donationData);
    const savedDonation = await donation.save();
    res.status(201).json({ message: 'Donation information submitted successfully', donation: savedDonation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// GET route to retrieve all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donate.find();
    res.status(200).json({ message: 'Donations retrieved successfully', count: donations.length, data: donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET route to show a specific donation
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donate.findById(id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.status(200).json({ message: 'Donation retrieved successfully', donation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT route to update a donation
router.put('/:id', validateDonation, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const donation = await Donate.findById(id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    donation.set(updateData);
    const updatedDonation = await donation.save();
    res.status(200).json({ message: 'Donation updated successfully', donation: updatedDonation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route to delete a donation
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donate.findByIdAndDelete(id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    // Remove the associated image file from the shelter_uploads folder
    if (donation.petImage) {
      const imagePath = `./${donation.petImage}`;
      console.log("Deleting image at path:", imagePath);
      await fs.unlink(imagePath);
    }
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PATCH route to update the status of a donation
router.patch('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donate.findById(id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    // Update the status of the donation to "Approved"
    donation.status = 'Approved';
    
    // Save the updated donation
    const updatedDonation = await donation.save();
    res.status(200).json({ message: 'Donation status updated successfully', donation: updatedDonation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Add error handling middleware to the router
router.use(errorHandler);

export default router;
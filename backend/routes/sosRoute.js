import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import cors from 'cors';
import { Sos } from '../models/sosModel.js';

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./sos_uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const validateSoses = (req, res, next) => {
  const soses = new Sos(req.body);
  const validationErrors = soses.validateSync();
  if (validationErrors) {
    const errors = Object.values(validationErrors.errors).map(err => err.message);
    return res.status(400).json({ message: 'Validation failed', errors });
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
};

router.post('/', upload.single('sosImage'), validateSoses, async (req, res) => {
  try {
    let sosesData = { ...req.body };

    if (req.file) {
      sosesData.sosImage = "/sos_uploads/" + req.file.filename;
    } else {
      sosesData.sosImage = null;
    }

    const soses = new Sos(sosesData);
    const savedSos = await soses.save();
    res.status(201).json({ message: 'Soses information submitted successfully', soses: savedSos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const sosess = await Sos.find();
    res.status(200).json({ message: 'Sosess retrieved successfully', count: sosess.length, data: sosess });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const soses = await Sos.findById(id);
    if (!soses) {
      return res.status(404).json({ message: 'Soses not found' });
    }
    res.status(200).json({ message: 'Soses retrieved successfully', soses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', upload.single('sosImage'), validateSoses, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.sosImage = "/sos_uploads/" + req.file.filename;
    }

    const soses = await Sos.findByIdAndUpdate(id, updateData, { new: true });
    if (!soses) {
      return res.status(404).json({ message: 'Soses not found' });
    }
    res.status(200).json({ message: 'Soses updated successfully', soses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const soses = await Sos.findByIdAndDelete(id);
    if (!soses) {
      return res.status(404).json({ message: 'Soses not found' });
    }
    if (soses.sosImage) {
      const imagePath = `.${soses.sosImage}`;
      await fs.unlink(imagePath);
    }
    res.status(200).json({ message: 'Soses deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const soses = await Sos.findById(id);
    if (!soses) {
      return res.status(404).json({ message: 'Soses not found' });
    }
    soses.status = 'Approved';
    const updatedSoses = await soses.save();
    res.status(200).json({ message: 'Soses status updated successfully', soses: updatedSoses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.use(errorHandler);

export default router;

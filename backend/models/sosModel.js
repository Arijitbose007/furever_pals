import mongoose from 'mongoose';

const sosSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  emergencyAddr: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  animalType: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    enum: ['Extremely Critical', 'Critical', 'Moderate Health'],
    required: true
  },
  sosImage: {
    type:String,
    required: false,
  },
  additionalInfo: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['Not Approved', 'Approved'],
    default: 'Not Approved',
  }
});

const Sos = mongoose.model('for_sos', sosSchema);

export { Sos };

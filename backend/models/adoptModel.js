import mongoose from "mongoose";

const adoptSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    number: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ['Not Approved', 'Approved'],
      default: 'Not Approved',
    }
});

export const Adopt = mongoose.model('for_adoption', adoptSchema);

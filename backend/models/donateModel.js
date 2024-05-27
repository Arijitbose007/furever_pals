import mongoose from "mongoose";

const donateSchema = new mongoose.Schema({
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
    age: {
      type: Number,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    animal: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true,
    },
    petImage: {
      type:String,
      required: false,
    },
    status: {
      type: String,
      enum: ['Not Approved', 'Approved'],
      default: 'Not Approved',
    }
});

export const Donate = mongoose.model('for_shelter', donateSchema);

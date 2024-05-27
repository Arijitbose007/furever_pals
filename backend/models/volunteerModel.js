import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
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
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    volunteerImage: {
      type:String,
      required: false,
    },
    status: {
      type: String,
      enum: ['Not Approved', 'Approved'],
      default: 'Not Approved',
    }
});

export const Volunteer = mongoose.model('for_volunteer', volunteerSchema);

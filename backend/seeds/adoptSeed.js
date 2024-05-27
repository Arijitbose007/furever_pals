import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { Adopt } from '../models/adoptModel.js';
import { mongoDBURL } from '../config.js';

// Connect to MongoDB
mongoose.connect(mongoDBURL).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Function to create dummy data
const createDummyData = async () => {
  try {
    // Clear existing data
    await Adopt.deleteMany({});
    console.log('All existing data deleted successfully!');

    // Create 10 dummy entries
    for (let i = 0; i < 20; i++) {
      const adopt = new Adopt({
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        pincode: parseInt(faker.location.zipCode('#####')), // Ensuring pincode is a number
        number: `+91${faker.string.numeric(10)}`, // Generate 10-digit number with +91 prefix
        status: faker.helpers.arrayElement(['Not Approved', 'Approved']),
      });

      await adopt.save();
    }

    console.log('Dummy data inserted successfully!');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  } finally {
    mongoose.connection.close();
  }
};

createDummyData();

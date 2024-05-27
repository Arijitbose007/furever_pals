import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { Volunteer } from '../models/volunteerModel.js';
import { mongoDBURL } from '../config.js';

// Connect to the database
mongoose.connect(mongoDBURL).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const createFakeVolunteers = async (num) => {
  try {
    const uploadsDir = path.join(path.resolve(), '../volunteer_uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Delete previous volunteers and associated image files
    const dirContents = await fs.readdir(uploadsDir);
    if (dirContents.length > 0) {
      for (const file of dirContents) {
        await fs.unlink(path.join(uploadsDir, file));
      }
    }

    // Delete previous volunteers from the database
    await Volunteer.deleteMany();
    console.log('Previous volunteers and associated image files deleted.');

    // Create fake volunteers
    for (let i = 0; i < num; i++) {
      // Fetch random profile image
      const { data } = await axios.get('https://randomuser.me/api/');
      const imageUrl = data.results[0].picture.large;

      // Create filename based on timestamp
      const fileName = `${Date.now()}-volunteerImage.jpg`;
      const filePath = path.join(uploadsDir, fileName);

      // Download image
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      await fs.writeFile(filePath, imageResponse.data);

      // Create fake volunteer with random data
      const volunteer = new Volunteer({
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        address: faker.location.streetAddress().slice(0, 20),
        city: faker.location.city().slice(0, 20),
        state: faker.location.state().slice(0, 20),
        age: faker.number.int({ min: 18, max: 65 }), // Assuming volunteer age range
        number: `+91${faker.string.numeric(10)}`,
        gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
        volunteerImage: `/volunteer_uploads/${fileName}`,
        status: 'Not Approved',
      });

      await volunteer.save();
    }
    console.log(`${num} fake volunteers created!`);
  } catch (error) {
    console.error('Seeding error:', error);
  }
};

// Run the seed function
createFakeVolunteers(10)
  .then(() => {
    console.log('Seeding completed.');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    mongoose.connection.close();
  });

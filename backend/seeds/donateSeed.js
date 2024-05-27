import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { Donate } from '../models/donateModel.js';
import { mongoDBURL } from '../config.js';

// Connect to the database
mongoose.connect(mongoDBURL).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const createFakeDonations = async (num) => {
  try {
    const uploadsDir = path.join(path.resolve(), '../shelter_uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Delete previous donations and associated image files
    const dirContents = await fs.readdir(uploadsDir);
    if (dirContents.length > 0) {
      for (const file of dirContents) {
        await fs.unlink(path.join(uploadsDir, file));
      }
    }

    // Delete previous donations from the database
    await Donate.deleteMany();
    console.log('Previous donations and associated image files deleted.');

    // Get random dog images
    for (let i = 0; i < num; i++) {
      // Fetch random dog image
      const { data } = await axios.get('https://dog.ceo/api/breeds/image/random');
      const imageUrl = data.message;

      // Extract breed from image URL
      const breed = imageUrl.split('/')[4];

      // Create filename based on timestamp and breed
      const fileName = `${Date.now()}-petImage.jpg`;
      const filePath = path.join(uploadsDir, fileName);

      // Download image
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      await fs.writeFile(filePath, imageResponse.data);

      // Create fake donation with random data
      const donation = new Donate({
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        address: faker.location.streetAddress().slice(0, 20),
        city: faker.location.city().slice(0, 20),
        state: faker.location.state().slice(0, 20),
        age: faker.number.int({ min: 1, max: 20 }),
        number: `+91${faker.string.numeric(10)}`,
        animal: 'dog',
        name: faker.person.firstName(),
        color: faker.color.human(),
        breed: breed,
        gender: faker.helpers.arrayElement(['Male', 'Female']),
        petImage: `/shelter_uploads/${fileName}`,
      });

      await donation.save();
    }
    console.log(`${num} fake donations created!`);
  } catch (error) {
    console.error('Seeding error:', error);
  }
};

// Run the seed function
createFakeDonations(10)
  .then(() => {
    console.log('Seeding completed.');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    mongoose.connection.close();
  });

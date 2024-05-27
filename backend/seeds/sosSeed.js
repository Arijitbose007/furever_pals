import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { Sos } from '../models/sosModel.js';
import { mongoDBURL } from '../config.js';

// Connect to the database
mongoose.connect(mongoDBURL).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const animalImageSources = {
  Dog: [
    'https://place.dog/500/500',
    
  ],
  Cat: [
    'https://thecatapi.com/api/images/get?format=src&type=jpg'
  ],
  Bird: [
    'https://loremflickr.com/500/500/bird',
  ],
  
};

const getAnimalImage = async (animalType) => {
  const sources = animalImageSources[animalType];
  for (const source of sources) {
    try {
      let imageUrl = source;
      if (source.includes('random.dog') || source.includes('shibe.online') || source.includes('randomfox.ca')) {
        const response = await axios.get(source);
        if (source.includes('random.dog')) {
          imageUrl = response.data.url;
        } else if (source.includes('shibe.online')) {
          imageUrl = response.data[0];
        } else if (source.includes('randomfox.ca')) {
          imageUrl = response.data.image;
        }
      }
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      return imageResponse.data;
    } catch (error) {
      console.error(`Failed to download image from ${source}:`, error.message);
    }
  }
  throw new Error(`All sources for ${animalType} failed`);
};

const createFakeSosRequests = async (num) => {
  try {
    const uploadsDir = path.join(path.resolve(), '../sos_uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Delete previous SOS requests and associated image files
    const dirContents = await fs.readdir(uploadsDir);
    if (dirContents.length > 0) {
      for (const file of dirContents) {
        await fs.unlink(path.join(uploadsDir, file));
      }
    }

    // Delete previous SOS requests from the database
    await Sos.deleteMany();
    console.log('Previous SOS requests and associated image files deleted.');

    // Create fake SOS requests
    for (let i = 0; i < num; i++) {
      // Select a random animal type
      const animalType = faker.helpers.arrayElement(Object.keys(animalImageSources));

      // Fetch the animal image
      const imageData = await getAnimalImage(animalType);

      // Create filename based on timestamp
      const fileName = `${Date.now()}-sosImage.jpg`;
      const filePath = path.join(uploadsDir, fileName);

      // Save image to the file system
      await fs.writeFile(filePath, imageData);

      // Create fake SOS request with random data
      const sosRequest = new Sos({
        fullName: faker.person.fullName(),
        emergencyAddr: faker.location.streetAddress().slice(0, 20),
        city: faker.location.city().slice(0, 20),
        state: faker.location.state().slice(0, 20),
        pincode: faker.string.numeric(6),
        number: `+91${faker.string.numeric(10)}`,
        animalType: animalType,
        condition: faker.helpers.arrayElement(['Extremely Critical', 'Critical', 'Moderate Health']),
        sosImage: `/sos_uploads/${fileName}`,
        additionalInfo: faker.lorem.sentence(),
        status: 'Not Approved',
      });

      await sosRequest.save();
    }
    console.log(`${num} fake SOS requests created!`);
  } catch (error) {
    console.error('Seeding error:', error);
  }
};

// Run the seed function
createFakeSosRequests(10)
  .then(() => {
    console.log('Seeding completed.');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    mongoose.connection.close();
  });

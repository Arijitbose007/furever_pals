// index.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';
import donateRoute from './routes/donateRoute.js';
import volunteerRoute from './routes/volunteerRoute.js';
import adoptRoute from './routes/adoptRoute.js';
import sosRoute from './routes/sosRoute.js';

const app = express();

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: false }));

// Middleware to parse incoming data as JSON
app.use(express.json());

// Allowed all origins with default of CORS(*)
app.use(cors());

// Serve static files from the 'shelter_uploads' and 'volunteer_uploads' directories
app.use('/shelter_uploads', express.static('shelter_uploads'));
app.use('/volunteer_uploads', express.static('volunteer_uploads'));
app.use('/sos_uploads', express.static('sos_uploads'));

// Route handlers
app.use('/donate', donateRoute);
app.use('/volunteer', volunteerRoute);
app.use('/adopt', adoptRoute);
app.use('/sos', sosRoute);

// Connect to MongoDB and start the server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to the database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

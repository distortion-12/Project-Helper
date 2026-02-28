// Basic Express server setup
const express = require('express');
require('dotenv').config({ path: __dirname + '/.env' });
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://project-helper-sepia.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());
const logger = require('./middleware/logger');
app.use(logger);

// Use API routes
const apiRouter = require('./routes/api');
console.log('API router registered');
app.use('/api', apiRouter);
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});


// Catch-all 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).send('API route not found');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

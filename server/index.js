// Basic Express server setup
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const logger = require('./middleware/logger');
app.use(logger);

// Use API routes
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

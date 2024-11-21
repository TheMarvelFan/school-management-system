const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

connectDB();

const app = express();

app.use(express.json());

// API routes
app.use('/api', routes);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

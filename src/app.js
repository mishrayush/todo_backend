require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { AppModule } = require('./app.module');
const connectDB = require('./config/database');
const { setupSwagger } = require("../swagger");
const { WHITELISTDOMAIN } = require('./constants/constants');
const notFound = require('./common/middlewares/notFound.middleware');
const errorHandler = require('./common/middlewares/errorHandler.middleware');
const logger = require('./common/middlewares/logger.middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

// Parse JSON requests with a size limit of 50MB
app.use(express.json({ limit: '50mb' }));

// Parse URL-encoded requests with a size limit of 50MB
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Logger
app.use(logger);

// Enable CORS with credentials support, allowing requests from the specified whitelist domain
app.use(cors({ credentials: true, origin: WHITELISTDOMAIN }));

//security features
app.use(helmet());

//log requests in a developer-friendly formate
app.use(morgan('combined'));

// Setup Swagger
setupSwagger(app);

// Connect DB
connectDB();

// Load application modules and routes
AppModule(app);

// Check service is up and running
app.get('/healthcheck', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Use Middleware for 404 Handling
app.use(notFound);

// Use Middleware for Global Error Handling
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

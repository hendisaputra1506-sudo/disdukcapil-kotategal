const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');

// Import routes
const healthRoutes = require('./routes/health');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Security Headers
app.use(helmet());

// Cookie Parser
app.use(cookieParser());

// CORS Config
const allowedOrigins = [
  process.env.FRONTEND_PUBLIC_URL || 'http://localhost:5173',
  process.env.FRONTEND_ADMIN_URL || 'http://localhost:5174'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);

// Unknown endpoint handler
app.use('/api/*', notFoundHandler);
app.use('*', notFoundHandler);

// Global Error Handler
app.use(errorHandler);

module.exports = app;

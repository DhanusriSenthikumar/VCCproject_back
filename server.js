import express from 'express';
import postsRouter from './routes/posts.js';
import authRouter from './routes/auth.js';
import connectDB from './config/db.js';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 5000;

// Update allowedOrigins to include your deployed frontend URL
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'http://192.168.246.179:5173', // Another local development URL
  'https://vccproj-front.onrender.com' // Deployed frontend for VCC project
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin, like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // Enable cookies and authorization headers across domains
  })
);

app.use(cookieParser());
app.use(compression());

// Connect to database
connectDB();

// API routes
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

// Root route to verify server is running
app.get('/', (req, res) => {
  res.send('Yay!! Backend of VCC Project is now accessible');
});

// Start the server
app.listen(port, () => {
  console.log(Server is running on port ${port});
});

export default app;

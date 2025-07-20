import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fighterRoutes from './routes/fighterRoutes.js';
import matchupRoutes from './routes/matchupRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/fighters', fighterRoutes);
app.use('/api/matchups', matchupRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('FightClub.AI backend is live!');
});
app.get('/test', (req, res) => {
  res.send('Test route working!');
});
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
})
.catch(err => console.error('❌ MongoDB connection error:', err));

import express from 'express';
import cors from 'cors';
import { config } from './src/config/env.js';
import pool from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';

const app = express();

app.use(cors({ origin: config.clientUrl }));
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'ok', dbTime: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.use('/api/v1/auth', authRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
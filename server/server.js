import express from 'express';
import { config } from './src/config/env.js';
import pool from './src/config/db.js';

const app = express();

// quick health check - confirms server is up AND db is reachable
app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'ok',
      dbTime: result.rows[0].now,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
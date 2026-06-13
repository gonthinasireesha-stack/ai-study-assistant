import pg from 'pg';
import { config } from './env.js';

const { Pool } = pg;

const pool = new pg.Pool({
  connectionString: config.databaseUrl,
});

pool.on('error', (err) => {
  console.error('pg pool error:', err);
  process.exit(1);
});

pool.on('connect', () => console.log('db connected'));

export default pool;
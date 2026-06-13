import dotenv from 'dotenv';
dotenv.config();

const required = [
  'PORT',
  'DATABASE_URL',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
];

for (const key of required) {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

export const config = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  geminiApiKey: process.env.GEMINI_API_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};
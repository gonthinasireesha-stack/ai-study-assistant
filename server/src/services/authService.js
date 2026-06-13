import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { createUser, findUserByEmail } from '../models/userModel.js';
import { saveRefreshToken } from '../models/refreshTokenModel.js';

const SALT_ROUNDS = 10;

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '15m' });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, config.jwtRefreshSecret, { expiresIn: '7d' });
};

export const signup = async ({ name, email, password }) => {
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await createUser({ name, email, hashedPassword });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  await saveRefreshToken(user.id, refreshToken, expiresAt);

  return { user, accessToken, refreshToken };
};

export const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new Error('Invalid email or password');
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  await saveRefreshToken(user.id, refreshToken, expiresAt);

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, accessToken, refreshToken };
};
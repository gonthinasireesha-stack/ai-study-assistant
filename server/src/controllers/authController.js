import { signup, login } from '../services/authService.js';

export const signupHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const { user, accessToken, refreshToken } = await signup({ name, email, password });

    res.status(201).json({ user, accessToken, refreshToken });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { user, accessToken, refreshToken } = await login({ email, password });

    res.status(200).json({ user, accessToken, refreshToken });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
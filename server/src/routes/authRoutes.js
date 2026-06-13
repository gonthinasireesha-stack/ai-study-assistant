import { Router } from 'express';
import { signupHandler, loginHandler } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { findUserById } from '../models/userModel.js';

const router = Router();

router.post('/signup', signupHandler);
router.post('/login', loginHandler);

router.get('/me', requireAuth, async (req, res) => {
  const user = await findUserById(req.userId);
  res.json({ user });
});

export default router;


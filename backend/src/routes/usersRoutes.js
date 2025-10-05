import express from 'express';
import { loginUser, signupUser } from '../controllers/usersControllers.js';

const router = express.Router();

// login route
router.post('/login', loginUser)

// sign up route
router.post('/signup', signupUser)


export default router;
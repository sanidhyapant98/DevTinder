import express from 'express'
import { signup, login, logout } from '../controllers/authController.js'
import { validateSignup } from '../utils/validations.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

export const authRouter = express.Router()

authRouter.post('/signup', validateSignup, signup)
authRouter.post('/login', login)
authRouter.post('/logout', authMiddleware, logout)
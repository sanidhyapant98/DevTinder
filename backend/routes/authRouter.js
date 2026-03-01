import express from 'express'
import { signup } from '../controllers/authController.js'
import { validateSignup } from '../utils/validations.js'

export const authRouter = express.Router()

authRouter.post('/signup', validateSignup, signup)

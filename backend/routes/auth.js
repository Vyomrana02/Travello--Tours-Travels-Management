import express from 'express'
import { login, register,forgotPassword,resetPassGet,resetPassPost, registerget } from '../Controllers/authController.js'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password',forgotPassword)
router.get('/reset-password/:id/:token',resetPassGet)
router.post('/reset-password/:id/:token',resetPassPost)
router.get('/registerNew/:token',registerget)
export default router

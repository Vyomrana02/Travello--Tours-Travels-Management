import express from 'express'
import { createBooking, getAllBooking, getBooking ,createPayment} from '../Controllers/bookingController.js'
import { verifyAdmin, verifyUser} from '../utils/verifyToken.js'

const router = express.Router()
// const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post('/', verifyUser, createBooking)
router.post('/payment',verifyUser, createPayment)
router.get('/:ids',getBooking)
router.get('/', verifyAdmin, getAllBooking)

export default router
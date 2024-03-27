import express from 'express'
import { createBooking, getAllBooking, getBooking ,createPayment,checkOverlap, cancelBooking,CheckGuestSize} from '../Controllers/bookingController.js'
import { verifyAdmin, verifyUser} from '../utils/verifyToken.js'

const router = express.Router()
// const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post('/', verifyUser, createBooking)
router.post('/Check', verifyUser, checkOverlap)
router.post('/payment',verifyUser, createPayment)
router.get('/:ids',getBooking)
router.get('/', verifyAdmin, getAllBooking)
router.post('/cancel', verifyUser, cancelBooking)
router.post('/CheckGuestSize',verifyUser,CheckGuestSize);
export default router
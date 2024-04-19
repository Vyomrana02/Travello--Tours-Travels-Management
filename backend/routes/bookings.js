import express from 'express'
import { createBooking, getAllBooking, getBooking ,createPayment,checkOverlap, cancelBooking,CheckGuestSize} from '../Controllers/bookingController.js'
import { verifyAdmin, verifyUser} from '../utils/verifyToken.js'

const router = express.Router()

router.post('/', verifyUser, createBooking)
router.post('/Check', verifyUser, checkOverlap)
router.post('/payment',verifyUser, createPayment)
router.get('/:ids',verifyUser,getBooking)
router.get('/', verifyAdmin, getAllBooking)
router.post('/cancel', verifyUser, cancelBooking)
router.post('/CheckGuestSize',verifyUser,CheckGuestSize);
export default router

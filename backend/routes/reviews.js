import express from 'express'
import { createReview,getUserReview } from '../Controllers/reviewController.js'
import { verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/:tourId', verifyUser, createReview)
router.get('/:usermail',verifyUser,getUserReview)
export default router
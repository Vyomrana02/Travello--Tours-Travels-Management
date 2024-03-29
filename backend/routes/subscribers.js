import express from 'express'
import {addSubscriers } from '../Controllers/subscribersController.js'

const router = express.Router()

router.post('/',addSubscriers)


export default router
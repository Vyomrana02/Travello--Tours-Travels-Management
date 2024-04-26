import express from 'express'
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour,getSingleTourbyname,pauseUnPause } from '../Controllers/tourControllers.js'

import { verifyAdmin } from '../utils/verifyToken.js'

// import multer from 'multer'

// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         return cb(null,"../frontend/public/uploads")
//     },
//     filename:function(req,file,cb){
//         return cb(null,`${Date.now()}_${file.originalname}`)
//     }
// })

// const upload =  multer({storage})
// const router = express.Router()

// //Create new tour 
// // router.post('/', verifyAdmin, createTour)
// router.post('/',upload.single('photo'),verifyAdmin,createTour)


// //Update tour 
// router.put('/:id',upload.single('photo'), updateTour)

const router = express.Router()

//Create new tour 
// router.post('/', verifyAdmin, createTour)
router.post('/',verifyAdmin,createTour)


//Update tour 
router.put('/:id',verifyAdmin, updateTour)


//Delete tour 
router.delete('/:id', verifyAdmin, deleteTour)

//Get single tour 
router.get('/:id', getSingleTour)

//Get tour by name
router.get('/byname/:name', getSingleTourbyname)

//Get all tour 
router.get('/', getAllTour)

//Get tour by search
router.get("/search/getTourBySearch", getTourBySearch)
router.get("/search/getFeaturedTour", getFeaturedTour)
router.get("/search/getTourCount", getTourCount)
router.get("/pauseUnpause/:id",pauseUnPause);



export default router

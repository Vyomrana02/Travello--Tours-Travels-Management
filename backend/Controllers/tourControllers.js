import Tour from '../models/Tour.js'


export const createTour = async (req, res) => {
   var newTour = new Tour(req.body)
   console.log(req);
   console.log(req.file,req.body);
   newTour.photo = "/uploads/" + req.file.filename;
   try {
      console.log(newTour)
      const savedTour = await newTour.save()

      res.status(200).json({ success: true, message: 'Successfully created', data: {savedTour} })
   } catch (error) {
      res.status(500).json({ success: true, message: 'Failed to create. Try again!' })
   }
}



//Update Tour
export const updateTour = async (req, res) => {
   const id = req.params.id
   console.log(req.body)
   try {

      const updatedTour = await Tour.findByIdAndUpdate(id, {
         $set: req.body
      }, { new: true })

      res.status(200).json({ success: true, message: 'Successfully updated', data: updatedTour })
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update' })
   }
}

//Delete Tour
export const deleteTour = async (req, res) => {
   const id = req.params.id

   try {
      await Tour.findByIdAndDelete(id)

      res.status(200).json({ success: true, message: 'Successfully deleted' })
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete' })
   }
}

//Getsingle Tour
export const getSingleTour = async (req, res) => {
   const id = req.params.id

   try {
      const tour = await Tour.findById(id).populate('reviews')

      res.status(200).json({ success: true, message: 'Successfully', data: tour })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}

//Get tour by name
export const getSingleTourbyname = async (req, res) => {
   const name = req.params.name

   try {
      const tour = await Tour.find({title:name}).populate('reviews')

      res.status(200).json({ success: true, message: 'Successfully', data: tour })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}



//Get All Tour
export const getAllTour = async (req, res) => {
   //For pagination
   const page = parseInt(req.query.page)
   const user = req.query.user
   try {
      if(user == 'admin'){
         const tours = await Tour.find().populate('reviews').skip(page * 8).limit(8)
         res.status(200).json({ success: true, count: tours.length, message: 'Successfully', data: tours })
      } else {
         const tours = await Tour.find({isPaused:false}).populate('reviews').skip(page * 8).limit(8)
         res.status(200).json({ success: true, count: tours.length, message: 'Successfully', data: tours })
      }
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}


// Get tour by search
export const getTourBySearch = async (req, res) => {

   // hear 'i' means case sensitive 
   const city = new RegExp(req.query.city, 'i')
   const distance = parseInt(req.query.distance)
   const maxGroupSize = parseInt(req.query.maxGroupSize)

   try {
      // gte means greater than equal
      const tours = await Tour.find({ city, distance: { $gte: distance }, maxGroupSize: { $gte: maxGroupSize },isPaused:false }).populate('reviews')

      res.status(200).json({ success: true, message: 'Successfully', data: tours })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}

//Get featured Tour
export const getFeaturedTour = async (req, res) => {
   //console.log(page)

   try {
      const tours = await Tour.find({ featured: true }).populate('reviews').limit(8)

      res.status(200).json({ success: true, message: 'Successfully', data: tours })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}

//Get tour count 
export const getTourCount = async(req,res) => {
   try {
      var pauseCount = 0;
      const Tours = await Tour.find({})
      var tourCount = 0;
      Tours.forEach(tour => {tourCount ++; if(tour.isPaused !== undefined && tour.isPaused === true){pauseCount = pauseCount+1;} })
      res.status(200).json({success:true, data:tourCount})
   } catch (error) {
      res.status(500).json({success:false, message: "Failed to fetch"})
   }
}

export const pauseUnPause = async(req,res) => {
   try {
      const id = req.params.id
      const tour = await Tour.findById(id)
      if(tour.isPaused === undefined){
         tour.isPaused = true;
      } else {
         tour.isPaused = !tour.isPaused;
      }
      const updatedTour = await Tour.findByIdAndUpdate(id, {
         $set: tour
      }, { new: true })
      res.status(200).json({success:true})
   } catch (error) {
      res.status(500).json({success:false, message: "Failed to fetch"})
   }
}

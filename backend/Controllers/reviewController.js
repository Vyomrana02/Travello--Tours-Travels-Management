import Tour from "../models/Tour.js"
import Review from "../models/Review.js"
import Booking from "../models/Booking.js"
export const createReview = async (req,res) => {
   const tourId  = req.params.tourId
   const newReview = new Review({...req.body}) 
   const tour = await Tour.findById(tourId)
   const userBookings = await Booking.find({userEmail:req.body.userEmail,tourName:tour.title,isCancelled:false});
   try {
      var tourDays = parseInt(tour.address.substr(0,tour.address.indexOf("N")))
      if(userBookings.length === 0){
         return res.status(400).json({success:false, message:"You can sumbit review only after the tour."})
      }
      userBookings.forEach((booking)=>{
         let date1 = new Date(booking.bookAt)
         let date2 = new Date();
 
         let Difference_In_Time =
            date2.getTime() - date1.getTime();
         
         let Difference_In_Days =
            Math.round(Difference_In_Time / (1000 * 3600 * 24));
            if(Difference_In_Days < tourDays ){
               return res.status(400).json({success:false, message:"You can sumbit review only after the tour."})
            }
         })
      
         const savedReview = await newReview.save()

         // after creating a new review now update the reviews array of the tour 
         await Tour.findByIdAndUpdate(tourId, {
            $push: {reviews: savedReview._id}
         })

      res.status(200).json({success:true, message:"Review submitted", data:savedReview})
      location.reload();
   } catch (error) {
      // return res.status(500).json({success:false, message:"Failed to submit"})
      return res.status(400)
   }
}

export const getUserReview = async (req,res) => {
   const useremail  = req.params.usermail
   
   try {
      const userReview = await Review.find({userEmail:useremail});

      res.status(200).json({success:true, message:"Review submitted", data:userReview})
      location.reload();
   } catch (error) {
            // return res.status(500).json({success:false, message:"Failed to submit"})
      return res.status(400)
   }
}


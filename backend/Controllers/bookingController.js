import Booking from './../models/Booking.js'
// import { Express } from 'express'
import nodemailer from './../node_modules/nodemailer/lib/nodemailer.js'
// const nodemailer = require("nodemailer")
import Razorpay from 'razorpay'
import Tour from './../models/Tour.js'
import date from 'date-and-time'
// const date = require('date-and-time') 
import dateFormat from 'dateformat';
const CheckOverlapping = async (prevbookings,newBooking) => {
   var newTour = await Tour.find({title:newBooking.tourName})
   for(let i=0;i<prevbookings.length;i++){
      
      const tour = await Tour.find({title:prevbookings[i].tourName})
      var oldtourDays = parseInt(tour[0].address?.substr(0,tour[0].address.indexOf("N")))
      var startDate = new Date(prevbookings[i].bookAt)
      var endDate = new Date(prevbookings[i].bookAt);
      endDate.setDate(endDate.getDate() + oldtourDays);
      
      var newtourDays = parseInt(newTour[0].address?.substr(0,newTour[0].address.indexOf("N")))
      var newStartDate = new Date(newBooking.bookAt)
      var newEndDate = new Date(newBooking.bookAt)
      newEndDate.setDate(newEndDate.getDate() + newtourDays);

      if(((startDate <= newStartDate) && (newStartDate <= endDate )) || 
            ((startDate <= newEndDate) && (newEndDate <= endDate )) ){
            // console.log("overlapp")
            return false;
      }
   }
   return true;
};

export const checkOverlap = async(req,res) => {
   const newBooking = new Booking(req.body)
   const prevbookings = await Booking.find({userEmail: req.body.userEmail});
   const ifOverlapp = await CheckOverlapping(prevbookings,newBooking);
   if(!ifOverlapp){
      return res.status(500).json({success:false, message:"Your booking is overlapping with your previous booking."})
   }
   return res.status(200).json({success:false, message:"Not Overlapping"})
}


export const createBooking = async(req,res) => {
   // console.log("ca")
   const newBooking = new Booking(req.body)
   // console.log(newBooking)
   try {
      
     var tempp = "<h2>Thank You for booking ....</h2><br>Details<br>"+"TourName:- " + newBooking.tourName + "<br>Booking Date:- "+ newBooking.bookAt + "<br> FullName:- " + newBooking.fullName +"<br>GuestSize:-"+newBooking.guestSize + "<br>Phone No.:- " +newBooking.phone + "<br><br>Our Coordinator will soon reach to you, For further details...";
   const message = {
      from : '"Travello 👻"',
      to: newBooking.userEmail,
      subject: "Booking Confirmation",
      html: tempp
   }


   let configs = {
      service: 'gmail',
      auth:{
         user:process.env.EMAIL,
         pass:process.env.PASSWORD
      }
   }
   let transporter = nodemailer.createTransport(configs)
   // let mailgenrator = new Mailgen({
   //    theme:"default",
   //    product:{
   //       name:"Mailgen",
   //       link:"https://mailgen.js"
   //    }
   // })

   // let respinse
   transporter.sendMail(message);
   //  console.log(newBooking)
      const savedBooking = await newBooking.save()

      res.status(200).json({success:true, message:"Your tour is booked!", data:savedBooking})
   } catch (error) {
      res.status(500).json({success:true, message:"Internal server error!"})
   }
}

// get single booking
export const getBooking = async(req,res) => {
   const id = req.params.ids
   
   try {
      // const book = await Booking.findById(id)
      const book = await Booking.find({userId: id});
      res.status(200).json({success:true, message:"Successful!", data:book})
   } catch (error) {
      res.status(404).json({success:true, message:"Not Found!"})
   }
} 


// get all booking
export const getAllBooking = async(req,res) => {
   
   try {
      const books = await Booking.find()

      res.status(200).json({success:true, message:"Successful!", data:books})
   } catch (error) {
      res.status(500).json({success:true, message:"Internal server error!"})
   }
} 
// const stripe = require("stripe")("sk_test_51OSfYqSC9inV6y9vc6hVPm8gQGs5JSwgcSl3ZPUbfatNritlKyT9daMtoI4yj1LOS0W4IjS5T31O7KBrQvvoho4w00WuuNHgKT");

export const createPayment = async(req,res) => {
   try{
      let {amount} = req.body;
      // console.log(req.body,"gfgh",req)
       
      var instance = new Razorpay({
         key_id: process.env.RAZORPAY_KEY_ID,
         key_secret:process.env.RAZORPAY_SECRET_ID
      });
      let order = await instance.orders.create({
         amount: amount * 100,
         currency:"INR",
         receipt:"receipt#1",
      });
      res.status(201).json({success:true});
   } catch(err){
      res.status(500).json({success:true, message:"Internal server error!"})
   }
}


export const cancelBooking = async(req,res) => {
   try{
      const BooksAt = dateFormat(req.body.bookAt, "mmmm dS, yyyy");
      const id = req.body._id
      var tempp = "<p>Dear Sir/Mam</p><p>We hope this email finds you well.<br>We're writing to confirm that we have successfully processed your request to cancel your booking with us. Your booking for " + req.body.tourName+ " has been officially cancelled.<br>Below are the details of your cancelled booking:<br>"+"TourName:- " + req.body.tourName + "<br>Tour Date:- " + BooksAt + "<br> FullName:- " + req.body.fullName +"<br>GuestSize:- "+req.body.guestSize + "<br>Phone No.:- " +req.body.phone + "<br> Amount Paid:- "+ req.body.totals + "<br><br>Your cancellation has been processed according to our cancellation policy. If there are any refundable amounts applicable, they will be processed to the original payment method used during booking within the specified timeframe mentioned in our terms and conditions.<br> We understand that plans can change, and we appreciate you choosing us for your travel needs. If you have any further questions or require assistance, please don't hesitate to contact our customer support team. We're here to help!<br>Thank you for your understanding.<br><br>Warm regards,<br>Travello Team</p>";
      const message = {
         from : '"Travello 👻"',
         to: req.body.userEmail,
         subject: "❌📅Confirmation of Cancelled Booking Request.🛑",
         html: tempp
      }
   
   
      let configs = {
         service: 'gmail',
         auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
         }
      }
      let transporter = nodemailer.createTransport(configs)
      transporter.sendMail(message);
   
      const updatedBooking = await Booking.findByIdAndUpdate(id, {
         $set: {
            isCancelled : true
         }
      }, { new: true })
      res.status(201).json({success:true});
   } catch(err){
      res.status(500).json({success:true, message:"Internal server error!"})
   }
}


export const CheckGuestSize = async (req,res) => {
   try{
      const booking = req.body
      const bookingsAtDate = await Booking.find({bookAt:booking.bookAt})
      // console.log(bookingsAtDate)
      // console.log(req.body);
      var totalGuest = parseInt(booking.guestSize);
      // for (let x in bookingsAtDate) {
      //    console.log(x)
      //    totalGuest += parseInt(x.guestSize)
      // }
      bookingsAtDate.forEach(tbooking => {totalGuest += parseInt(tbooking.guestSize)})
      // console.log(booking);
      const currTour = await Tour.find({title:booking.tourName})
      // console.log(currTour[0]);
      // console.log(totalGuest)
      if(totalGuest <= currTour[0].maxGroupSize){
         return res.status(201).json({success:true,message:"Can Book Tour"});
      } else {
         return res.status(201).json({success:false,message:"Max Guest at date reached"});
      }
   } catch(err){
      res.status(500).json({success:true, message:"Internal server error!"})
   }
}
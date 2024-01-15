import Booking from './../models/Booking.js'
// import { Express } from 'express'
import nodemailer from './../node_modules/nodemailer/lib/nodemailer.js'
// const nodemailer = require("nodemailer")
import Razorpay from 'razorpay'
// create new booking
export const createBooking = async(req,res) => {
   const newBooking = new Booking(req.body)

   try {
   //    let testAccount = await nodemailer.createTestAccount();
   //    const transporter = nodemailer.createTransport({
   //       host: 'smtp.ethereal.email',
   //       port: 587,
   //       secure:false,
   //       auth: {
   //           user: 'antwon41@ethereal.email',
   //           pass: '67P3yazqhGZax6WY3X'
   //       }
   //   });
     var tempp = "<h2>Thank You for booking ....</h2><br>Details<br>"+"TourName:- " + newBooking.tourName + "<br>Booking Date:- "+ newBooking.bookAt + "<br> FullName:- " + newBooking.fullName +"<br>GuestSize:-"+newBooking.guestSize + "<br>Phone No.:- " +newBooking.phone;
   //   const info = await transporter.sendMail({
   //    from: '"Fred Foo 👻" <antwon41@ethereal.email>', // sender address
   //    to: newBooking.userEmail, // list of receivers
   //    subject: "Hello ✔", // Subject line
   //    // text: "<h2>Thank You for booking ....</h2><br><br><br>Details <br><br>Booking Date:- "+ newBooking.bookAt + "<br> FullName:- " + newBooking.fullName +"<br>GuestSize:-<br>"+newBooking.guestSize+"<br>Phone No.:- " +newBooking.phone + "<br>TourName:- " + newBooking.tourName + "<br>", // plain text body
   //    html: tempp , // html body
   //  });
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
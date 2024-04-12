import Booking from './../models/Booking.js'
import nodemailer from './../node_modules/nodemailer/lib/nodemailer.js'
import Razorpay from 'razorpay'
import Tour from './../models/Tour.js'
import dateFormat from 'dateformat';
import QRCode from 'qrcode'

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
            return false;
      }
   }
   return true;
};

export const checkOverlap = async(req,res) => {
   const newBooking = new Booking(req.body)
   const prevbookings = await Booking.find({userEmail: req.body.userEmail, isCancelled:false});
   var ifOverlapp = true;
   if(prevbookings.length != 0){
      ifOverlapp = await CheckOverlapping(prevbookings,newBooking);
   }
   if(!ifOverlapp){
      return res.status(500).json({success:false, message:"Your booking is overlapping with your previous booking."})
   }
   return res.status(200).json({success:false, message:"Not Overlapping"})
}


export const createBooking = async(req,res) => {
   
   const newBooking = new Booking(req.body)
   
   try {
      var QR_URL = ""

         let img = await QRCode.toDataURL(`${newBooking._id}`, async function (err, url) {
            QR_URL = url
           
   var tempp = `
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Booking Details</title>
       <style>
           /* CSS styles */
           body {
               font-family: Arial, sans-serif;
               background-color: #f2f2f2;
               margin: 0;
               padding: 0;
           }
           .container {
               max-width: 600px;
               margin: 20px auto;
               background-color: #fff;
               padding: 20px;
               border-radius: 10px;
               box-shadow: 0 0 10px rgba(0,0,0,0.1);
           }
           h2 {
               color: #007bff;
               margin-bottom: 20px;
           }
           table {
               width: 100%;
               border-collapse: collapse;
               margin-bottom: 20px;
           }
           th, td {
               padding: 10px;
               text-align: left;
               border-bottom: 1px solid #ddd;
           }
           th {
               background-color: #f2f2f2;
           }
           form {
               margin-bottom: 20px;
           }
           label {
               display: block;
               margin-bottom: 10px;
               font-weight: bold;
           }
           input[type="text"],
           input[type="tel"] {
               width: 100%;
               padding: 10px;
               margin-bottom: 10px;
               border: 1px solid #ccc;
               border-radius: 5px;
           }
           input[type="submit"] {
               background-color: #007bff;
               color: #fff;
               border: none;
               padding: 10px 20px;
               border-radius: 5px;
               cursor: pointer;
           }
           input[type="submit"]:hover {
               background-color: #0056b3;
           }
       </style>
   </head>
   <body>
       <div class="container">
           <h2>Thank You for Booking</h2>
           <table>
               <tr>
                   <th>Attribute</th>
                   <th>Value</th>
               </tr>
               <tr>
                   <td>Tour Name</td>
                   <td>${newBooking.tourName}</td>
               </tr>
               <tr>
                   <td>Booking Date</td>
                   <td>${newBooking.bookAt}</td>
               </tr>
               <tr>
                   <td>Full Name</td>
                   <td>${newBooking.fullName}</td>
               </tr>
               <tr>
                   <td>Guest Size</td>
                   <td>${newBooking.guestSize}</td>
               </tr>
               <tr>
                   <td>Phone No.</td>
                   <td>${newBooking.phone}</td>
               </tr>
               <tr>
                   <td>Pick Up point</td>
                   <td>${newBooking.pickUppoint}</td>
               </tr>
    
<img src="${url}">
           </table>
           <p>Our Coordinator will soon reach out to you for further details.</p>
       </div>
   </body>
   </html>
   `;
   const message = {
      from : '"Travello 👻"',
      to: newBooking.userEmail,
      subject: "Booking Confirmation",
      html: tempp,
      attachDataUrls: true,
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

   const savedBooking = await newBooking.save()
      res.status(200).json({success:true, message:"Your tour is booked!", data:savedBooking})
   })
   } catch (error) {
      res.status(500).json({success:true, message:"Internal server error!"})
   }
}

// get single booking
export const getBooking = async(req,res) => {
   const id = req.params.ids
   
   try {
      const book = await Booking.find({userId: id});
      res.status(200).json({success:true, message:"Successful!", data:book})
   } catch (error) {
      res.status(404).json({success:true, message:"Not Found!"})
   }
} 


// get all booking
export const getAllBooking = async(req,res) => {
   
   try {
      const books = await Booking.find().sort({bookAt: -1})

      res.status(200).json({success:true, message:"Successful!", data:books})
   } catch (error) {
      res.status(500).json({success:true, message:"Internal server error!"})
   }
} 

export const createPayment = async(req,res) => {
   try{
      let {amount} = req.body;
       
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
      var tempp = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Cancellation Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f2f2f2; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
              <p>Dear Sir/Madam,</p>
              <p>We hope this email finds you well.</p>
              <p>We're writing to confirm that we have successfully processed your request to cancel your booking with us. Your booking for <strong>${req.body.tourName}</strong> has been officially cancelled.</p>
              <p>Below are the details of your cancelled booking:</p>
              <ul style="margin-bottom: 10px;">
                  <li><strong>Tour Name:</strong> ${req.body.tourName}</li>
                  <li><strong>Tour Date:</strong> ${BooksAt}</li>
                  <li><strong>Full Name:</strong> ${req.body.fullName}</li>
                  <li><strong>Guest Size:</strong> ${req.body.guestSize}</li>
                  <li><strong>Phone No.:</strong> ${req.body.phone}</li>
                  <li><strong>Amount Paid:</strong> ${req.body.totals}</li>
              </ul>
              <p>Your cancellation has been processed according to our cancellation policy. If there are any refundable amounts applicable, they will be processed to the original payment method used during booking within the specified timeframe mentioned in our terms and conditions.</p>
              <p>We understand that plans can change, and we appreciate you choosing us for your travel needs. If you have any further questions or require assistance, please don't hesitate to contact our customer support team. We're here to help!</p>
              <p>Thank you for your understanding.</p>
              <p>Warm regards,</p>
              <p>Travello Team</p>
          </div>
      </body>
      </html>
      `;
      
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
      const bookingsAtDate = await Booking.find({bookAt:booking.bookAt, isCancelled:false})
      var totalGuest = parseInt(booking.guestSize);
      bookingsAtDate.forEach(tbooking => {totalGuest += parseInt(tbooking.guestSize)})
      const currTour = await Tour.find({title:booking.tourName})
      if(totalGuest <= currTour[0].maxGroupSize){
         return res.status(201).json({success:true,message:"Can Book Tour"});
      } else {
         return res.status(201).json({success:false,message:"Max Guest at date reached"});
      }
   } catch(err){
      res.status(500).json({success:true, message:"Internal server error!"})
   }
}
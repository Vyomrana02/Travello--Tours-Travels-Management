import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from './../node_modules/nodemailer/lib/nodemailer.js'
//Create new User
export const createUser = async (req, res) => {
   const newUser = new User(req.body)

   try {
      const savedUser = await newUser.save()

      res.status(200).json({ success: true, message: 'Successfully created', data: savedUser })
   } catch (error) {
      res.status(500).json({ success: true, message: 'Failed to create. Try again!' })
   }
}

//Update User
export const updateUser = async (req, res) => {
   const id = req.params.id
   if(req.body.password.length < 20){
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(req.body.password, salt)
      req.body.password = hash
   } 
   try {
      if(req.body.isBan === true){
         var tempp = "Dear " + req.body.username +" ,<br>We regret to inform you that your account on the Travello website has been suspended due to a violation of our community guidelines. As a result, you are currently unable to access the platform.<br><br>To resolve this matter and regain access to your account, we kindly ask you to reach out to our support team at support@travello.com. Please provide any relevant details or explanations regarding the situation so that we can assist you further.<br><br>We understand that this may inconvenience you, and we apologize for any frustration caused. Our priority is to ensure a safe and enjoyable experience for all our users, and we appreciate your cooperation in resolving this issue promptly.<br><br>Thank you for your understanding and cooperation.<br><br>Best regards,<br>Travello Team"
         const message = {
            from : '"Travello 👻"',
            to: req.body.email,
            subject: "⚠️Account Suspension Notice: 🔒 Action Required.",
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
      } 
      console.log(req.body)
      const user = await User.findById(req.body._id)
      if(user.isBan === true && req.body.isBan === false){
         var tempp = "Dear " + req.body.username +" ,<br>We are pleased to inform you that your account on the Travello website has been successfully unbanned. You now have full access to all features and functionalities of our platform.<br><br>We apologize for any inconvenience caused by the temporary suspension and appreciate your patience throughout the process. Your satisfaction and enjoyment of Travello are important to us, and we are committed to providing you with a positive experience.<br><br>Should you have any questions or concerns, please don't hesitate to contact our support team at support@travello.com. We're here to assist you and ensure that your time on Travello is both enjoyable and rewarding.<br><br>Thank you for being a valued member of our community. We look forward to seeing you back on Travello!<br><br>Best regards,<br>Travello Team"
         const message = {
            from : '"Travello 👻"',
            to: req.body.email,
            subject: "🌍 Account Unbanned: Welcome Back to Travello! 🎉 ",
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
      }
      const updatedUser = await User.findByIdAndUpdate(id, {
         $set: req.body
      }, { new: true })

      res.status(200).json({ success: true, message: 'Successfully updated', data: updatedUser })
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update' })
   }
}

//Delete User
export const deleteUser = async (req, res) => {
   const id = req.params.id

   try {
      await User.findByIdAndDelete(id)

      res.status(200).json({ success: true, message: 'Successfully deleted' })
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete' })
   }
}

//Get single User
export const getSingleUser = async (req, res) => {
   const id = req.params.id

   try {
      const user = await User.findById(id)

      res.status(200).json({ success: true, message: 'Successfully', data: user })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}

//GetAll User
export const getAllUser = async (req, res) => {
   //console.log(page)

   try {
      const users = await User.find({})

      res.status(200).json({ success: true, message: 'Successfully', data: users })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}
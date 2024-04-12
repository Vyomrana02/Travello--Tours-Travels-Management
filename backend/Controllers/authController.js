import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from './../node_modules/nodemailer/lib/nodemailer.js'
import { jwtDecode } from 'jwt-decode' // import dependency

export const register = async (req, res) => {
   try {
      //hashing password
      const { email, username, password } = req.body;

      const oldUser = await User.findOne({ email })
      if (oldUser != null) {
         return res.status(500).json({ success: false, message: "User Already exists Exists!!" });
      }
      const secret = process.env.JWT_SECRET_KEY + "ABCDE";
      const token = jwt.sign({ email: email, username: username, password: password }, secret, {
         expiresIn: "5m",
      });
      const link = `http://localhost:4000/api/v1/auth/registerNew/${token}`;
      var tempp = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Travello Registration</title>
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
              .button {
                  display: inline-block;
                  background-color: #007bff;
                  color: #ffffff;
                  text-decoration: none;
                  padding: 10px 20px;
                  border-radius: 5px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Hello ${username},</h2>
              <p>Are you ready to gain access to all of the assets we prepared for Travello? ${email}.</p>
              <p>First, you must complete your registration by clicking on the button below:</p>
              <p><a href="${link}" class="button">Verify Email</a></p>
              <p>This link will verify your email address, and then you’ll officially be a part of the Travelllo community.</p>
              <p>See you there!</p>
              <p>The Travello Team</p>
          </div>
      </body>
      </html>
      `;
      const message = {
         from: '"Travello 👻"',
         to: email,
         subject: "🆗 Let's get your account verified! 🕵️‍♀️🔐",
         html: tempp
      }


      let configs = {
         service: 'gmail',
         auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
         }
      }
      let transporter = nodemailer.createTransport(configs)
      transporter.sendMail(message);


      res.status(200).json({ success: true, message: "Successfully created!" })
   } catch (error) {
      res.status(500).json({ success: false, message: "Failed to create! Try again." })
   }
}

export const registerget = async (req, res) => {
   try {
      const { token } = req.params;
      const secret = process.env.JWT_SECRET_KEY + "ABCDE";
      try {
         const verify = jwt.verify(token, secret);

         const user = jwtDecode(token)
         const { email, username, password } = user;
         const salt = bcrypt.genSaltSync(10)
         const hash = bcrypt.hashSync(password, salt)

         const newUser = new User({
            username: username,
            email: email,
            password: hash,
         })

         await newUser.save()
         return res.redirect('http://localhost:3000/login')
      } catch (error) {
         console.log(error);
         res.send("Not Verified");
      }
   } catch (error) {
      res.status(500).json({ success: false, message: "Failed to create! Try again." })
   }
}

// user login
export const login = async (req, res) => {
   try {
      const email = req.body.email
      const user = await User.findOne({ email })

      // if user doesn't exist
      if (!user) {
         return res.status(404).json({ success: false, message: 'User not found!' })
      }
      if (user.isBan === true) {
         return res.status(401).json({ success: false, message: 'User is Banned.' })
      }
      // if user is exist then check the passord or compare the password
      const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)

      // if password incorrect 
      if (!checkCorrectPassword) {
         return res.status(401).json({ susccess: false, message: "Incorrect email or password!" })
      }
      const { password, role, ...rest } = user._doc
      // const {role,...rest} = user._doc
      // create jwt token
      const sendata = req.body.password
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" })

      // set token in the browser cookies and send the response to the client
      res.cookie('accessToken', token, {
         httpOnly: true,
         expires: token.expiresIn
      }).status(200).json({ token, data: { ...rest, password: sendata, roles: role }, role })
   } catch (error) {
      res.status(500).json({ susccess: false, message: "Failed to login" })
   }
}

export const forgotPassword = async (req, res) => {
   try {
      const { email } = req.body;
      const oldUser = await User.findOne({ email })
      if (!oldUser) {
         return res.json({ status: "User Not Exists!!" });
      }
      if (oldUser.isBan === true) {
         return res.status(401).json({ success: false, message: 'User is Banned.' })
      }
      const secret = process.env.JWT_SECRET_KEY + oldUser.password;
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
         expiresIn: "5m",
      });
      const link = `http://localhost:4000/api/v1/auth/reset-password/${oldUser._id}/${token}`;

      var tempp = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Travello Password Reset</title>
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
              a.button {
                  display: inline-block;
                  background-color: #007bff;
                  color: #ffffff;
                  text-decoration: none;
                  padding: 10px 20px;
                  border-radius: 5px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Hello ${oldUser.username},</h2>
              <p>Somebody requested a new password for the Travello account associated with ${email}.</p>
              <p>No changes have been made to your account yet. You can reset your password by clicking the link below:</p>
              <p><a href="${link}" class="button">Reset Password</a></p>
              <p>If you did not request a new password, please let us know immediately by replying to this email.</p>
              <p>Yours,</p>
              <p>The Travello Team</p>
          </div>
      </body>
      </html>
      `;
      const message = {
         from: '"Travello 👻"',
         to: email,
         subject: "📨🔓 I'll assist you in resetting your password.",
         html: tempp
      }


      let configs = {
         service: 'gmail',
         auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
         }
      }
      let transporter = nodemailer.createTransport(configs)
      transporter.sendMail(message);
      res.status(200).json({ susccess: true, message: "Email send Successfully for resetting password" })

   } catch (error) {
      res.status(500).json({ susccess: false, message: "Failed to Forgot Password" })
   }
}


export const resetPassGet = async (req, res) => {
   try {
      const { id, token } = req.params;
      const oldUser = await User.findOne({ _id: id });
      if (!oldUser) {
         return res.json({ status: "User Not Exists!!" });
      }
      const secret = process.env.JWT_SECRET_KEY + oldUser.password;
      try {
         const verify = jwt.verify(token, secret);
         return res.redirect('http://localhost:3000/reset-password/' + id + '/' + token)
      } catch (error) {
         console.log(error);
         res.send("Not Verified");
      }
   } catch (error) {
      res.status(500).json({ susccess: false, message: "Failed to Reset Password" })
   }
}

export const resetPassPost = async (req, res) => {
   // const { id, token } = req.params;
   const id = req.params.id
   const token = req.params.token
   const { pass } = req.body;
   const oldUser = await User.findOne({ _id: id });
   if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
   }
   const secret = process.env.JWT_SECRET_KEY + oldUser.password;
   try {
      const verify = jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hash(pass, 10);
      await User.updateOne(
         {
            _id: id,
         },
         {
            $set: {
               password: encryptedPassword,
            },
         }
      );
      res.status(200).json({ success: true, message: "Successfully created!" })

   } catch (error) {
      console.log(error);
      res.json({ status: "Something Went Wrong" });
   }
}
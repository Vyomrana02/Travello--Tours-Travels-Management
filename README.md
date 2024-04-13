# Travello

Travello is a web application designed to facilitate tour booking, management, and administration. It offers a range of features to enhance user experience and streamline tour operations.

## Features

### User Features

- **User Authentication**: Secure user registration and login with password encryption.
- **Role-Based Access Control**: Every route is secured by backend roles.
- **Profile Management**: Users can update their profiles.
- **Forgot Password**: Password reset functionality with URL verification.
- **Search Tours**: Search for tours by location, max group size, and distance.
- **View Weather**: View weather forecasts for the next 7 days.
- **Book Tours**: Book tours with options for guest size limits, overlapping booking prevention, and QR code payments using Razorpay.
- **Review Tours**: Leave reviews for booked tours and after the tour has ended.
- **Cancel Booking**: Users can cancel their bookings, with restrictions if the tour is less than 1 day away.

### Admin Features

- **Tour Management**: Admins can add, update, delete, pause/unpause tours.
- **User Management**: Admins can view all users, make users admins, and ban/unban users.
- **Booking Management**: Admins can view user bookings and cancel them if necessary.
- **Tour Feature**: Admins can feature some tours.

## Technologies Used

- **Frontend**: React.js with media queries for responsive design, lazy loading.
- **Backend**: Node.js with Express.js, middleware for URL parsing.
- **Database**: Online database (e.g., MongoDB).
- **Authentication**: JWT for user authentication.
- **Payment**: Integration with Razorpay for all types of payments and QR code.
- **Weather API**: Integration with a weather API for weather forecasts.

## Video 
https://drive.google.com/file/d/1aNFr3oomh2aMMT0022Xd1XPWyRLz23Vq/view?usp=drive_link

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Vyomrana02/Travello--Tours-Travels-Management.git

2. Install dependencies:

   ```bash
   cd travello
   npm install

3. Set up environment variables: Create a .env file in the root directory and add the necessary environment variables, such as database connection string, API keys, etc
   
4. Start the development server:

   ```bash
   npm start

Contributing
Contributions are welcome! If you have any ideas for new features, optimizations, or bug fixes, feel free to open an issue or submit a pull request.


import React from 'react'
import '../styles/link-verify.css'
const Unverified = () => {
  return (
    <div className="link-not-verified-container">
    <div className="content">
        <h1 className="title">Link Not Verified</h1>
        <p className="message">
            The link you are trying to access has not been verified.
        </p>
        <p className="message">
            Please ensure you are using the correct link or contact support for assistance.
            Go to <a href="/">Home page </a>
        </p>
    </div>
    <div className="contact-info">
        <p>If you need further assistance, you can contact support at:</p>
        <p>Email: travello-support@gmail.com</p>
        <p>Phone: 123-456-7890</p>
    </div>
</div>
  )
}

export default Unverified
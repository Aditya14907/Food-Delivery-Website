// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="foot-content">
            <div className="foot-content-left">
                <img src={assets.logo} alt="" />
                <p>ABCDEFGJJANAJUHDBDHYJANBSJBXHBE HEBJHB HXBEXVEDUYEHBHJB IQKQBKAMSXIQHNQJBNJDBWBHDBchzbh</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>
            </div>
            <div className="foot-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="foot-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 8877601928</li>
                    <li>support@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>CopyRight 2024 © Tomato.com - ALL rights reserved.</p>
    </div>
  )
}

export default Footer
import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {

    return (
        <div className='footer'>
            <div className='about-marketplace-list'>
                <div className='child'>About Marketplace</div>
                <div className='contact-us grand-children'>
                    <div>Contact Us</div>
                </div>
            </div>
            <div className='customer-service-list'>
                <div className='child'>Customer Service</div>
                <div className='grand-children'>
                    <div>Return and refund policy</div>
                    <div>Shipping info</div>
                    <div>Recall and product safety alerts</div>
                </div>
            </div>
            <div className='help-list'>
                <div className='child'>Help</div>
                <div className='grand-children'>
                    <div>Support center & FAQ</div>
                    <div>How to order</div>
                    <div>How to track</div>
                    <div>Partener with us</div>
                </div>
            </div>
            <div className='terms-of-use-list'>
                <div className='child'>Terms of Use</div>
            </div>
            <div className='social-media-list'>
                <div className='child'>Connect with us</div>
                <div className=' social-media-icons' >
                    <div><FontAwesomeIcon icon={faInstagram}/></div>
                    <div><FontAwesomeIcon icon={faFacebook}/></div>
                    <div><FontAwesomeIcon icon={faXTwitter}/></div>
                    <div><FontAwesomeIcon icon={faTiktok}/></div>
                    <div><FontAwesomeIcon icon= {faYoutube}/></div>
                </div>
            </div>
        </div>
    )

}

export default Footer
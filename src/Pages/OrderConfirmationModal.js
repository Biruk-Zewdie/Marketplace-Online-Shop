import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './OrderConfirmationModal.css'
import React, { useContext, useState, useEffect } from 'react'
import { UserAuthenticationContext } from '../Context/UserAuthenticationContext';
import BrandLogo from '../Components/NavBar/NavBar1Components/BrandLogo';
import { useNavigate } from 'react-router-dom';

const OrderConfirmationModal = ({ isOpen, onClose }) => {
    const { currentUserProfile } = useContext(UserAuthenticationContext)
    const [futureDate, setFutureDate] = useState('');
    const navigate = useNavigate ()

    useEffect(() => {
        const currentDate = new Date();
        const future = new Date(currentDate);
        future.setDate(currentDate.getDate() + 6);
        const formattedDate = `${future.getMonth() + 1}/${future.getDate()}/${future.getFullYear()}`;
        setFutureDate(formattedDate);
    }, []);

    const handleCloseBtnClick = () => {
        onClose ()
        navigate ('/my_orders')
    }

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <div className='logo'><BrandLogo /></div>
                    <div className='order-confirmation'>Order Confirmation</div>
                </div>
                <div className='content'>
                    <div className='greeting'>
                        <h4>Hello</h4>
                        <h4>
                            {currentUserProfile.name},
                        </h4>
                    </div>
                    <div className='message'>
                        <p>Thank You for shopping with us. We'will send a confirmation when your item ships.</p>
                    </div>
                </div>
                <div className='details'>
                    <h4>Details</h4>
                    <p>Order #112-5016191-0887773</p>
                </div>
                <div className='shipping-info'>
                    <div className='arriving'>
                        <p style={{fontWeight:'bolder'}}>Arriving:</p>
                        <p>{futureDate}</p>

                    </div>
                    <div className='shipping-address'>
                        <p style={{fontWeight:'bolder'}}>Ship to:</p>
                        <p>415 Girard St NW </p>
                        <p>WASHINGTON, DC 20001-3823,</p>
                        <p>United States</p>
                    </div>
                </div>
                <button className='modal-close-btn' onClick={handleCloseBtnClick}>close</button>
            </div>

        </div>
    )

}

export default OrderConfirmationModal;
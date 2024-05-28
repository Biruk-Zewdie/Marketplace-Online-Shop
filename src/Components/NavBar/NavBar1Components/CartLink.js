import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


const CartLink = () => {
    const navigate = useNavigate ()

    const handleCartClick = () => {
        navigate('/ShopingCart')
    }

    return (
        <div onClick={handleCartClick}>
            <FontAwesomeIcon icon={faCartShopping} size='3x'/>

        </div>
    )

}

export default CartLink
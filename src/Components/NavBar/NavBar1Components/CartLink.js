import React, { useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartContext } from '../../../Context/ShoppingCartContext';



const CartLink = () => {
    const {noOfitems} = useContext(ShoppingCartContext)
    const navigate = useNavigate()

    const handleCartClick = () => {
        navigate('/ShoppingCart')
    }


    return (
        <div onClick={handleCartClick}>
            <div>
                <FontAwesomeIcon icon={faCartShopping} size='3x' color='white' />
                <span>
                    {noOfitems}
                </span>
            </div>

        </div>
    )

}

export default CartLink
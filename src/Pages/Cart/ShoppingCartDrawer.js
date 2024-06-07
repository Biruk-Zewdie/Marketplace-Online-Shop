import React, { useContext, useState, useEffect } from 'react'
import { UserAuthenticationContext } from '../../Context/UserAuthenticationContext'
import './ShoppingCartDrawer.css'
import { useNavigate } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context/ShoppingCartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

// const getCartItemsFromLocalStorage = () => {
//     let cartItems = localStorage.getItem('cartItems')
//     if (cartItems) {
//         return (cartItems = JSON.parse(cartItems))
//     } else {
//         return []
//     }
// }


const ShoppingCartDrawer = () => {
    const [isChecked, setIsChecked] = useState(false)
    const { currentUserProfile } = useContext(UserAuthenticationContext)
    const navigate = useNavigate()
    const {
        cartProducts,
        setCartProducts,
        quantities,
        setQuantities,
        handleAddQuantityClick,
        handleSubtractQuantityClick,
        handleRemoveClick,
        subtotal
    } = useContext(ShoppingCartContext)
    // const [quantities, setQuantities] = useState({})


    const toggleCheckBox = () => {
        setIsChecked(!isChecked)
    }

    const handleShopNowClick = () => {
        navigate('/all_products')
    }

    console.log(cartProducts)
    // useEffect(() => {
    //     const calculateSubtotal = () => {
    //         const total = cartProducts.reduce((sum, product) => {
    //             return sum + product.price * quantities[product.id]
    //         }, 0)
    //         setSubtotal (total)

    //     }
    //     calculateSubtotal ()


    // }, [cartProducts, quantities])

    const handleCheckoutBtnClick = () => {
        if (currentUserProfile) {
            navigate('/checkout')
        } else {
            navigate('/Login')
        }
    }



    return (
        cartProducts.length > 0 ?
            (<div className='shopping-cart'>
                <div className='cart-header'>
                    <h1>Marketplace Shopping Cart</h1>
                </div>
                <div className='select-all-checkbox'>
                    <input
                        type='checkbox'
                        isChecked={isChecked}
                        onChange={toggleCheckBox}
                    />
                    Select All
                </div>
                <div className=''>
                    {cartProducts.map((product) =>
                        <div key={product.id} className='cart-Product-container'>
                            <input
                                type='checkbox'
                                isChecked={isChecked}
                                onChange={toggleCheckBox}
                            />
                            <div className='cart-product-image'>
                                <img src={product.images[0]} alt={product.title} />
                            </div>
                            <div className='cart-product-title'>
                                {product.title}
                            </div>
                            <div className='quantity-increment-decrement'>
                                <button
                                    className='minus-button'
                                    onClick={() => {
                                        if (quantities[product.id] > 1) {
                                            handleSubtractQuantityClick(product.id)
                                        } else {
                                            handleRemoveClick(product.id)
                                        }
                                    }} >
                                    {quantities[product.id] > 1 ?
                                        <FontAwesomeIcon icon={faMinus} /> :
                                        <FontAwesomeIcon icon={faTrashCan} />}
                                </button>
                                <div className='quantity'>{quantities[product.id]}</div>
                                <button
                                    className='add-button'
                                    onClick={() => handleAddQuantityClick(product.id)}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            <div className='cart-product-price'>${(product.price * quantities[product.id]).toLocaleString ()}</div>
                            <button onClick={() => handleRemoveClick(product.id)}>Remove</button>
                        </div>)
                    }
                    <button onClick={handleCheckoutBtnClick}>Continue To Checkout (${subtotal.toLocaleString()})</button>
                </div>
            </div>
            ) :
            <div className='empty-cart'>
                Your personal cart is empty
                <button onClick={handleShopNowClick}>Shop now</button>
            </div>

    )

}

export default ShoppingCartDrawer;
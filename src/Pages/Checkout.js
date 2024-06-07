import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import './Checkout.css'
import OrderConfirmationModal from './OrderConfirmationModal'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ShoppingCartContext } from '../Context/ShoppingCartContext'
import { UserAuthenticationContext } from '../Context/UserAuthenticationContext'
import { AllUsersDataContext } from '../Context/AllUsersDataContext'
import Login from './Login/Login'


const Checkout = () => {
    const { noOfitems, subtotal, cartProducts, EmptyShoppingCart } = useContext(ShoppingCartContext)
    const { currentUserProfile } = useContext(UserAuthenticationContext)
    const { usersEmail } = useContext(AllUsersDataContext)
    const [isOpen, setIsOpen] = useState(false)

    const handleModalOpen = () => {
        EmptyShoppingCart()
        setIsOpen(true)
    }

    const handleModalClose = () => {
        setIsOpen(false)
    }
    console.log(currentUserProfile)



    return (
        <>
            <div className='checkout-container'>
                <div className='buyer-info'>
                    <div className='checkout-header'>
                        <h3>Checkout({noOfitems} items)</h3>
                    </div>

                    <div className='shipping-address'>
                        <div className='shipping-address-header'>1. Shipping address</div>
                        <div className='buyer-address-info'>
                            <div className='buyer-name'>{currentUserProfile.name}</div>
                            <div className='buyer-street-address'>415 Girard St NW</div>
                            <div className='buyer-state-address'>WASHINGTON, DC 20001-3823,</div>
                            <div>United States</div>
                        </div>
                        <div className='address-change'>
                            <button>change</button>
                        </div>
                    </div>

                    <div className='item-details'>
                        <div className='item-details-header'><p>2.Item details</p></div>
                        <div className='items-image-container'>
                            {cartProducts.map((product) =>
                                <div className='list-of-items-image' key={product.id}>
                                    <img src={product.images[0]} alt={product.title} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='payment-method'>
                        <div className='payment-method-header'>3.Payment methods</div>
                        <div className='checkbox'>
                            <div className='payment-method-1'>
                                <div>
                                    <input
                                        type='checkbox'
                                        id='visa-1'
                                    />
                                    <label htmlFor='visa-1'>Visa...4502</label>
                                </div>
                                <button>Edit</button>
                            </div>
                            <div className='payment-method-2'>
                                <div>
                                    <input
                                        type='checkbox'
                                        id='visa-2'
                                    />
                                    <label htmlFor='visa-2'>Visa...1489</label>
                                </div>
                                <button>Edit</button>
                            </div>
                            <div className='add-payment'>
                                <div><button><FontAwesomeIcon icon={faPlus} /></button></div>
                                <div className='add-card-payment'>Add credit or debit card</div>
                            </div>
                            <div className='payment-method-3'>
                                <input
                                    type='checkbox'
                                    id='paypal'
                                />
                                <label htmlFor='paypal'>Paypal</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='order-summary'>

                    <div className='order-summary-header'>
                        Order Summary
                    </div>
                    <div className='order-summary-table'>
                        <div className='subtotal'>
                            Subtotal({noOfitems} items)
                            <span>${subtotal.toLocaleString()}</span>
                        </div>
                        <div className='delivery-fee'>
                            Delivery fee
                            <span>Free</span>
                        </div>
                        <div className='sales-tax'>
                            Sales taxes
                            <span>${((0.06 * subtotal)).toLocaleString()}</span>
                        </div>

                        <div className='total'>
                            Order total
                            <span>${((0.06 * subtotal) + subtotal).toLocaleString()}</span>
                        </div>
                    </div>

                    <button className='submit-order-btn' onClick={handleModalOpen}>Place your order</button>
                </div>
            </div>
            {isOpen &&
                <OrderConfirmationModal isOpen={isOpen} onClose={handleModalClose}>
                </OrderConfirmationModal>
            }
        </>
    )
}

export default Checkout
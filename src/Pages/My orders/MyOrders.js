import React, { useContext } from 'react'
import './MyOrders.css'
import { ShoppingCartContext } from '../../Context/ShoppingCartContext'
import { UserAuthenticationContext } from '../../Context/UserAuthenticationContext'

const MyOrders = () => {
    const { orderedProducts } = useContext(ShoppingCartContext)
    const { currentUserProfile } = useContext(UserAuthenticationContext)


    return (

        <div className='my-orders'>

            <h1>{currentUserProfile.name}'s Orders</h1>
            <div>
                <div className='my-order-container'>
                    {orderedProducts ?
                        (orderedProducts.map((orders) => (
                            <div className='order' key={orders.orderNumber}>
                                <div className='delivery-date'>Order Date: {orders.orderDate}</div>
                                <div className='order-details-container'>
                                    <div className='order-products'>
                                        {orders.products.map((product) => (
                                            <div className='myorder-images' key={product.id}>
                                                <img src={product.images[0]} alt={product.title} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className='order-details'>
                                        <div className='quantity-price'>{orders.quantity} Items : ${orders.totalPrice}</div>
                                        <div className='my-order-number'>Order Number: {orders.orderNumber}</div>
                                    </div>
                                </div>
                            </div>
                        )))
                        : <div>NO order Placed</div>}

                </div>
            </div>
        </div>
    )
}
export default MyOrders
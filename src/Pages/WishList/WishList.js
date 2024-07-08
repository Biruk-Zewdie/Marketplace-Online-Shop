import React, { useContext } from 'react'
import './WishList.css'
import { WishListContext } from '../../Context/WishListContext';

const WishList = () => {
    const { wishListItems, setWishListItems, removeItemFromWishList, wishListAddedProducts } = useContext(WishListContext)
    console.log(wishListAddedProducts)



    return (
        <div>
            <h1 className='wishlist-header'>Wish List</h1>
            {wishListItems.length > 0 ?
                <div className='wish-list'>
                    {wishListItems.map((Item, index) =>
                        <div
                            className='item-container'
                            key={index}>
                            <div className='item-image'>
                                <img src={Item.images[0]} alt={Item.title} />
                            </div>
                            <div className='wishlist-item-details'>
                                <div>{Item.title}</div>
                                <div>${Item.price}</div>
                            </div>
                            <div className='add-remove-btn'>
                                <button className='wishlist-item-to-cart'>Add to cart</button>
                                <button className='wishlist-item-remove-btn' onClick={() => removeItemFromWishList(Item.id)}>Remove from list</button>
                            </div>
                        </div>)}
                </div> : <div className='empty-wishlist'>
                    <div className='empty-wishlist-message'>No product in your wishlist</div>
                    <img src='/Images/empty-wishlist.png' alt='empty wishlist' />
                </div>}
        </div>
    )

}

export default WishList;
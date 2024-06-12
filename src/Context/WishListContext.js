import React, { useState, useContext, useEffect } from 'react'
import { AllCategoriesContext } from './AllCategoriesContext'
import { all } from 'axios'

export const WishListContext = React.createContext()

const getWishlistItemsFromLocalStorage = () => {
    let wishlistItems = localStorage.getItem(('wishlist items'))
    if (wishlistItems) {
        return (wishlistItems = JSON.parse(wishlistItems))
    } else {
        return []
    }
}

export const WishListProvider = ({ children }) => {
    const [isInWishList, setIsInWishList] = useState(false)
    const { allProducts, setAllProducts } = useContext(AllCategoriesContext)
    const [wishListItems, setWishListItems] = useState(getWishlistItemsFromLocalStorage())
    const [wishListAddedProducts, setWishListAddedProducts] = useState({})

    const toggleAddToWishList = (productId) => {
        setIsInWishList(!isInWishList)
        if (wishListAddedProducts[productId] === true) {
            removeItemFromWishList(productId)
        } else {
            addToWishList(productId)
        }

    }

    const addToWishList = (productId) => {
        const product = allProducts.find((product) => product.id === productId)
        setWishListItems(wishListItems => [...wishListItems, product])
        setWishListAddedProducts(newAddedProducts => ({ ...newAddedProducts, [productId]: true }))
    }

    useEffect(() => {
        localStorage.setItem('wishlist items', JSON.stringify(wishListItems))
    }, [wishListItems])

    const removeItemFromWishList = (productId) => {
        const deleteItem = wishListItems.filter((product) => product.id !== productId)
        setWishListItems(deleteItem)
        setWishListAddedProducts(wishListItems => ({ ...wishListItems, [productId]: false }))


    }

    useEffect(() => {
        const initialItemsInList = {}
        wishListItems.forEach((Item) => {
            initialItemsInList[Item.id] = true
        });
        setWishListAddedProducts(initialItemsInList)
    }, [wishListItems])



    return (
        <WishListContext.Provider value={{ isInWishList, toggleAddToWishList, addToWishList, wishListItems, setWishListItems, wishListAddedProducts, setWishListAddedProducts, removeItemFromWishList }}>
            {children}
        </WishListContext.Provider>
    )
}
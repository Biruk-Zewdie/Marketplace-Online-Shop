import React, { useState, useEffect } from 'react'

export const ShoppingCartContext = React.createContext()

/*============================== Get Cart Items and its quantites Form Local Storage ==========================*/
const getCartItemsFromLocalStorage = () => {
    let cartItems = localStorage.getItem('cartItems')
    if (cartItems) {
        return (cartItems = JSON.parse(cartItems))
    } else {
        return []
    }
}

const getCartItemsQuantityFromLocalStorage = () => {
    let cartItemsQuantity = localStorage.getItem('cartItemsQuantity')
    if (cartItemsQuantity) {
        return (cartItemsQuantity = JSON.parse(cartItemsQuantity))
    } else {
        return []
    }
}

/*=============================== Shopping Cart Context ===================================*/

export const ShoppingCartProvider = ({ children }) => {

    const [cartProducts, setCartProducts] = useState(getCartItemsFromLocalStorage())
    const [quantities, setQuantities] = useState(getCartItemsQuantityFromLocalStorage () )
    const [noOfitems, setNoOfItems] = useState(0)
    const [subtotal, setSubtotal] = useState(0)


    /*============================== Add Goods and Empty Shopping Cart ==========================*/

    const addToShoppingCart = (product) => {
        setCartProducts(cartProducts => [...cartProducts, product])
    }

    const EmptyShoppingCart = () => {
        setCartProducts([])
        setQuantities({})
        localStorage.removeItem('cartItems')
    }

    /*============================== Save Cart Items in Local Storage==========================*/
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartProducts))
        localStorage.setItem('cartItemsQuantity', JSON.stringify(quantities))
    }, [cartProducts,quantities])

    /*================================ Set product quantities ==============================*/
    useEffect(() => {
        setQuantities(existingQuantities => {
            const updatedQuantities = { ...existingQuantities }
            cartProducts.forEach((product) => {
                if (!(product.id in updatedQuantities)) {
                    updatedQuantities[product.id] = 1
                }
            })
            return updatedQuantities
        })

        // const initialQuantities = {};
        // cartProducts.forEach((product) => {
        //     initialQuantities[product.id] = 1
        // });
        // setQuantities(initialQuantities )
    }, [cartProducts])

    /*================================ Set total number of products in shopping cart ==============================*/

    useEffect(() => {
        const cartItems = () => {
            const totalItems = cartProducts.reduce((totalItems, product) => {
                return totalItems + (quantities[product.id])
            }, 0)
            setNoOfItems(totalItems)
        }
        cartItems()
    }, [quantities])

    /*============================================ Calculate Subtotals ==========================================*/

    useEffect(() => {
        const calculateSubtotal = () => {
            const total = cartProducts.reduce((sum, product) => {
                return sum + product.price * quantities[product.id]
            }, 0)
            setSubtotal(total)

        }
        calculateSubtotal()


    }, [cartProducts, quantities])

    /*================================ Add and subtract/ remove Product ==============================*/

    const handleAddQuantityClick = (productId) => {
        setQuantities((quantities) => ({ ...quantities, [productId]: quantities[productId] + 1 }))
    }

    const handleSubtractQuantityClick = (productId) => {

        setQuantities((quantities) => {
            const newQuantities = { ...quantities }
            newQuantities[productId] -= 1;
            if (newQuantities[productId] < 1) {
                delete newQuantities[productId]
                setCartProducts((cartProducts) => cartProducts.filter((product) => product.id !== productId))
            }
            return newQuantities
        })
    }

    /*======================================= Remove Product =========================================*/

    const handleRemoveClick = (productId) => {
        setQuantities((quantities) => {
            const newQuantities = { ...quantities }
            delete newQuantities[productId]
            return newQuantities
        })

        const deleteProduct = cartProducts.filter((product) => product.id !== productId)
        setCartProducts(deleteProduct)
    }

    return (
        <ShoppingCartContext.Provider value=
            {{
                cartProducts,
                addToShoppingCart,
                setCartProducts,
                quantities,
                setQuantities,
                handleAddQuantityClick,
                handleSubtractQuantityClick,
                handleRemoveClick,
                noOfitems,
                subtotal,
                EmptyShoppingCart
            }}
        >
            {children}
        </ShoppingCartContext.Provider>

    )


}




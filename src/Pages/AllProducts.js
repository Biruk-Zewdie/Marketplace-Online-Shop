import React, { useState, useEffect, useContext } from 'react'
import './AllProducts.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AllProductsPagination from '../Components/AllProductsPagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { ShoppingCartContext } from '../Context/ShoppingCartContext'
import { AllCategoriesContext } from '../Context/AllCategoriesContext'

const AllProducts = () => {
    const productsPerPage = 30;
    const [currentPage, setCurrentPage] = useState(1)
    const { addToShoppingCart, cartProducts, quantities, setQuantities, handleAddQuantityClick, handleSubtractQuantityClick, handleRemoveClick } = useContext(ShoppingCartContext)
    const { allProducts, setAllProducts } = useContext(AllCategoriesContext)
    const [addedProducts, setAddedProducts] = useState({})
    const navigate = useNavigate()


    const goToProductDetailsPage = (productId) => {
        navigate(`/${productId}/product_details`)
    }
    /* To persist the state of the button across navigation, make sure addedProducts accurately
     reflects the contents of the cart. Initialize this state based on cartProducts. */
    useEffect(() => {
        const initiallyAddedProducts = {}
        cartProducts.forEach((product) => {
            initiallyAddedProducts[product.id] = true

        });
        setAddedProducts(initiallyAddedProducts)
    }, [cartProducts])


    const AddToShoppingCart = (productId) => {
        const product = allProducts.find((product) => product.id === productId)
        if (product) {
            // if (cartProducts.find((cartProduct) => cartProduct.id === productId)) {
            //     alert('The product is already added in the shopping cart')
            // } else {
            addToShoppingCart(product)
            setAddedProducts(newAddedProducts => ({ ...newAddedProducts, [productId]: true }))
            // }
        }
    }

    const removeFromShoppingCart = (productId) => {
        handleRemoveClick(productId)
        setAddedProducts(cartProducts => ({ ...cartProducts, [productId]: false }))
    }



    const extractUrl = (url) => {
        const start = url.indexOf('h')
        const end = url.indexOf('"', start + 1)
        if (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png')) {
            if (start !== -1 && end !== -1) {
                return url.slice(start, end)
            }
        }
        return url;
    }

    /*=========================================Pagination============================================*/
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const getPaginatedProducts = () => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const paginatedProducts = allProducts.slice(startIndex, endIndex)
        return (paginatedProducts)
    }

    return (
        <>
            <div className='product-card'>
                {getPaginatedProducts().map((product, index) =>
                    <div
                        className='product-card-container'
                        key={index}
                        onClick={() => goToProductDetailsPage(product.id)}

                    >
                        {/* {console.log(product.images)} */}
                        <img
                            className='product-image'

                            src={product.images && product.images.length > 0 ?
                                product.images[0]
                                : 'Images/Mproduct.png'}
                            alt={product.title}
                        />
                        {console.log(extractUrl(product.images[0]))}
                        <div className='product-price'>${product.price}</div>
                        <div className='product-name'>{product.title}</div>
                        <div>
                            {!addedProducts[product.id] ?
                                (
                                    <button onClick={(event) => {
                                        event.stopPropagation();
                                        AddToShoppingCart(product.id)
                                    }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />Add
                                    </button>
                                ) : (
                                    <div className='all-products-quantity-increment-decrement'>
                                        <button
                                            className='all-products-minus-button'
                                            onClick={(event) => {
                                                event.stopPropagation();

                                                // quantities[product.id] > 1 ?
                                                //     handleSubtractQuantityClick(product.id) :
                                                //     removeFromShoppingCart(product.id)
                                                if (quantities[product.id] > 1) {
                                                    handleSubtractQuantityClick(product.id)
                                                } else {
                                                    removeFromShoppingCart(product.id)
                                                }

                                            }}
                                        >
                                            {quantities[product.id] > 1 ?
                                                (<FontAwesomeIcon icon={faMinus} />) :
                                                (<FontAwesomeIcon icon={faTrashCan} />)
                                            }

                                        </button>
                                        <div className='all-products-quantity'>{quantities[product.id]}</div>
                                        <button
                                            className='all-products-add-button'
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                handleAddQuantityClick(product.id)
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>)}

            </div>
            <AllProductsPagination productsPerPage={productsPerPage} handlePageChange={handlePageChange} currentPage={currentPage}>

            </AllProductsPagination>
        </>
    )

}

export default AllProducts;
import React, { useState, useEffect, useContext } from "react";
import './ProductDetails.css'
import axios from "axios";
import { useParams } from "react-router-dom";
import { faMinus, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";
import { WishListContext } from "../Context/WishListContext";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductDetails = () => {

    const [product, setProduct] = useState()
    const [relatedProducts, setRelatedProducts] = useState([])
    const { quantities, cartProducts, addToShoppingCart, handleSubtractQuantityClick, handleRemoveClick, handleAddQuantityClick } = useContext(ShoppingCartContext)
    const [selectedImageUrl, setSelectedImageUrl] = useState('')
    const [selectedImageUrlIndex, setSelectedImageUrlIndex] = useState('')
    const [productFetchError, setProductFetchError] = useState(null)
    const { toggleAddToWishList, wishListAddedProducts } = useContext(WishListContext)
    const { productId } = useParams();



    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${productId}`)
                setProduct(response.data)
                console.log(response.data.category)
            } catch (error) {
                setProductFetchError(error.message)
                console.error('Error fetching product:', error)
            }
        }
        getProduct();

    }, [productId])

    // if (product) {
    //     console.log(product.category.id)

    // }
    useEffect(() => {
        const getAllRelatedProducts = async () => {
            try {
                if (product && product.category && product.category.id) {
                    const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${product.category.id}/products`)
                    setRelatedProducts(response.data)
                }
            } catch (error) {
                setProductFetchError(error.message)
                console.error('error fetching related products:', error)
            }
        }
        getAllRelatedProducts()
    }, [product])

    console.log(relatedProducts)

    const handleImageClick = (Image, index) => {
        setSelectedImageUrl(Image)
        setSelectedImageUrlIndex(index)
    }


    return (
        product &&
        <div className='container'>
            <div className='product'>
                <div className="image-container">
                    {product.images.map((imageUrl, index) =>
                        <div key={index} className={`image ${selectedImageUrlIndex === index ? 'selected' : ''} `} >
                            <img
                                onClick={() => handleImageClick(imageUrl, index)}
                                onMouseEnter={() => handleImageClick(imageUrl, index)}
                                src={imageUrl}
                                alt={product.title}
                            />
                        </div>
                    )}
                </div>
                {console.log(product.images[0])}
                <div className='main-product-image'>
                    <img
                        className='main-product-image-img'
                        src={selectedImageUrl ? selectedImageUrl : product.images[0]}
                        alt={product.title}
                    />
                </div>
                <div className='product-details'>
                    <div className='product-name'>{product.title}</div>
                    <hr />
                    <div className='product-category'>{product.category.name}</div>
                    <div className='product-description'>{product.description}</div>
                    <hr />
                </div>
                <div className='product-shopping'>
                    <div className='product-price'>${product.price}</div>
                    <div className='details-page-quantity-btn'>
                        <button
                            className='details-page-minus-button'
                            onClick={() => {
                                if (quantities[product.id] > 1) {
                                    handleSubtractQuantityClick(product.id)
                                } else {
                                    handleRemoveClick(product.id)
                                }
                            }} >
                            {quantities[product.id] > 1 ?
                                <FontAwesomeIcon icon={faMinus} /> :
                                (cartProducts.some((p) => p.id === product.id)) &&
                                <FontAwesomeIcon icon={faTrashCan} />
                            }
                        </button>
                        {console.log(quantities[product.id])}
                        <div className='count'>{
                            cartProducts.some((p) => p.id === product.id) ? quantities[product.id] : 'Quantity'}</div>
                        <button
                            className='details-page-add-button'
                            disabled={!(cartProducts.some((p) => p.id === product.id))}
                            onClick={() => handleAddQuantityClick(product.id)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                    <button
                        className='add-to-shopping-cart-btn'
                        onClick={() => addToShoppingCart(product)}
                        disabled={cartProducts.some((p) => p.id === product.id)}
                    >
                        Add to Shopping Cart
                    </button>
                    <button
                        className='add-to-wishlist-btn'
                        onClick={() => toggleAddToWishList(product.id)}
                    >
                        {wishListAddedProducts[product.id] ? (
                            <>
                                Remove from wishlist <FavoriteIcon />
                            </>
                        ) : (
                            <>
                                Add to wishlist <FavoriteBorderIcon />
                            </>
                        )}
                    </button>

                </div>
            </div>
            <div className='similar-products'>
                <h2>You May Also Would Like To Buy ...</h2>
            </div>
            <div className='related-products-container'>
                {relatedProducts.map((relatedProduct, index) =>
                    <div key={index} className='related-product-info'>
                        <img className='related-product-image' src={relatedProduct.images[0]} alt={relatedProduct.title} />
                        <div className="related-product-name">{relatedProduct.title}</div>
                    </div>
                )}
            </div>
        </div>

    )
}

export default ProductDetails;


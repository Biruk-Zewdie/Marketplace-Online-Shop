import React, { useState, useEffect } from "react";
import './ProductDetails.css'
import axios from "axios";
import { useParams } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductDetails = () => {

    const [product, setProduct] = useState()
    const { productId } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${productId}`)
            setProduct(response.data)

        }
        getProduct();

    }, [productId])


    return (
        product &&
        <div className='container'>
            <div className='product'>
                <div className="image-container">
                    {product.images.map((imageUrl, index) =>
                        <div key={index} className="image" >
                            <img src={imageUrl && imageUrl.length > 0 ? imageUrl.slice(2,-2) : 'no images found'}
                                alt={product.title}
                            />
                        </div>)}
                </div>
                {console.log(product.images[0].slice(2,-2))}
                <div className='main-product-image'>
                    <img
                        className='main-product-image-img'
                        src={product.images[0].slice(2,-2)}
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
                    <button>Quantity:1</button>
                    <button>Add to Shopping Cart</button>
                    <button>Add to wishList <FontAwesomeIcon icon={faHeart} /></button>

                </div>
            </div>
            <div className='similar-products'>
                <h2>You May Also Would Like To Buy ...</h2>




            </div>
        </div>

    )
}

export default ProductDetails;


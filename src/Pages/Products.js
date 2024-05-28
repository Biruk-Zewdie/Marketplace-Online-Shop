import React, { useState, useEffect } from 'react'
import styles from './Products.module.css'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([])
    const { categoryId } = useParams()
    const navigate = useNavigate()

    console.log (categoryId)
    useEffect(() => {
        const getAllProductsInThisCategory = async () => {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`)
            console.log (response.data)
            setProducts(response.data)
        }
        getAllProductsInThisCategory()

    }, [categoryId])


    const handleProductCardClick = (productId) => {
        navigate(`/${productId}/product_details`)
    }

    console.log(products)
    return (
        <div className = {styles['products']}>
            {products.map((product, index) =>
                <div className = {styles['product-card']} key={index}>
                    <div onClick={() => handleProductCardClick(product.id)}>
                        <img className= {styles ['product-image']}
                            src={product.images && product.images.length > 0 ? product.images[0] : 'Images/missing product image.png'}
                            alt={product.title}
                        />
                        <div className={styles['product-price']}>${product.price}</div>
                        <div className={styles['product-name']}>{product.title}</div>
                    </div>

                </div>)
            }
        </div>
    )
}
export default Products;
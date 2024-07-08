import React, { useState, useEffect, useContext } from 'react'
import styles from './Products.module.css'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { AllCategoriesContext } from '../Context/AllCategoriesContext';

const Products = () => {
    const [products, setProducts] = useState([])
    const { allCategories } = useContext(AllCategoriesContext)
    const { categoryId } = useParams()
    const navigate = useNavigate()

    console.log(allCategories)
    useEffect(() => {
        const getAllProductsInThisCategory = async () => {
            try {
                if (categoryId) {
                    const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`)
                    setProducts(response.data)
                }
            } catch (error) {
                console.error('Error fetching products under the category:', error)
            }
            
        }
        getAllProductsInThisCategory()

    }, [categoryId])


    const handleProductCardClick = (productId) => {
        navigate(`/${productId}/product_details`)
    }

    console.log(products)
    return (
        products.length > 0 ?
            (< div className={styles['products']} >
                {products.map((product, index) =>
                    <div className={styles['product-card']} key={index}>
                        <div onClick={() => handleProductCardClick(product.id)}>
                            <img className={styles['product-image']}
                                src={product.images && product.images.length > 0 ? product.images[0] : '/Images/missing product image.png'}
                                alt={product.title}
                            />
                            <div className={styles['product-price']}>${product.price}</div>
                            <div className={styles['product-name']}>{product.title}</div>
                        </div>
                    </div >)}
            </div>) :
            < div className={styles['no-product']}>
                <div>No product Found </div>
                <img src='/Images/no-product.png' alt='No Product Found' />
            </div >


    )
}
export default Products;
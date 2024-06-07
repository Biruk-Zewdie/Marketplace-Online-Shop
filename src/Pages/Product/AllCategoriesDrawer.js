import React, { useState, useEffect, useContext } from 'react'
import './AllCategoriesDrawer.css'
import axios from 'axios'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Products from '../Products';
import { useNavigate } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { AllCategoriesContext } from '../../Context/AllCategoriesContext';

const AllCategoriesDrawer = ({ showDrawer, toggleDrawer }) => {
    const { allCategories } = useContext(AllCategoriesContext)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [productsForCategory, setProductsForCategory] = useState({})
    const navigate = useNavigate()

    const getAllProductsForCategory = async (categoryId) => {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`)
        setProductsForCategory((productsForCategory) => ({ ...productsForCategory, [categoryId]: response.data }))

    }
    const handleMouseEnter = async (category) => {
        setSelectedCategory(category)
        // if (!productsForCategory[category.id]) {
        await getAllProductsForCategory(category.id)
    }

    const handleCategoryClick = (categoryId) => {
        navigate(`/${categoryId}/products`)
        toggleDrawer()
        console.log(categoryId)
    }
    const handleProductClick = (productId) => {
        navigate(`/${productId}/product_details`)
        toggleDrawer()
    }

    if (!showDrawer) {
        return null
    }

    return (
        <>
            <div className={`drawer ${showDrawer ? 'open' : ''}`}>
                <div className='drawer-content'>
                    <button className='close-button' onClick={toggleDrawer}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <div className='drawer-body'>
                        <div className='category-column'>
                            {allCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className='category-item'
                                    onMouseEnter={() => handleMouseEnter(category)}
                                    onClick={() => handleCategoryClick(category.id)}
                                >
                                    <span className='category-name'> {category.name} </span><span className='chevron-right'><FontAwesomeIcon icon={faChevronRight} /></span>
                                </div>
                            ))}
                        </div>
                        <div className='product-column'>
                            {selectedCategory &&
                                <div >
                                    <div className='header-product-column'>
                                        {selectedCategory.name}
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </div>
                                    <div className='drawer-product-card'>
                                        {productsForCategory[selectedCategory.id] && productsForCategory[selectedCategory.id].length > 0 ? (productsForCategory[selectedCategory.id].map((product) => (
                                            <div
                                                key={product.id}
                                                className='product-item'
                                                onClick={() => handleProductClick(product.id)}
                                            >
                                                {/* {console.log(product)} */}
                                                <div className='drawer-product-image' ><img src={product.images[0]} alt={product.title} /></div>
                                                <div className='product-title'>{product.title}</div>
                                            </div>
                                        ))) : (
                                            <div className='no-products'>
                                                No Products Available.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='drawer-overlay' onClick={toggleDrawer}></div>
        </>
    )
}

export default AllCategoriesDrawer;
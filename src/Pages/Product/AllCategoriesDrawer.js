import React, { useState, useEffect, useContext } from 'react'
import './AllCategoriesDrawer.css'
import axios from 'axios'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Products from '../Products';
import { useNavigate } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { AllCategoriesContext } from '../../Context/AllCategoriesContext';
import { DrawerContext } from '../../Context/DrawerContext';

const AllCategoriesDrawer = () => {
    const { allCategories } = useContext(AllCategoriesContext)
    const { toggleDrawer, isDrawerOpen } = useContext(DrawerContext)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [productsForCategory, setProductsForCategory] = useState({})
    const navigate = useNavigate()

    const getAllProductsForCategory = async (categoryId) => {
        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`)
            setProductsForCategory((productsForCategory) => ({ ...productsForCategory, [categoryId]: response.data }))
        } catch (error) {
            console.error('Error fetching products under the category:', error)

        }


    }
    const handleMouseEnter = async (category) => {
        setSelectedCategory(category)
        // if (!productsForCategory[category.id]) {
        await getAllProductsForCategory(category.id)
    }

    const handleCategoryClick = (categoryId) => {
        navigate(`/${categoryId}/products`)
        toggleDrawer()
    }

    const handleProductClick = (productId) => {
        toggleDrawer()
        navigate(`/${productId}/product_details`)
    }

    if (!isDrawerOpen) {
        return null
    }

    return (
        <>
            <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
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
                                    <div className='category-name'> {category.name} </div><div className='chevron-right'><FontAwesomeIcon icon={faChevronRight} /></div>
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
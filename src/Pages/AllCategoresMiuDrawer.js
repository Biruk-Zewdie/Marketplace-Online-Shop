import React, { useState, useContext } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material';

import { createTheme } from '@mui/material';
import { AllCategoriesContext } from '../Context/AllCategoriesContext';
import { useNavigate } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const AllCategoriesMiuDrawer = ({ toggleDrawer, showDrawer }) => {
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
        // toggleDrawer()
        console.log(categoryId)
        console.log('category clicked', categoryId)
    }

    const handleProductClick = (productId) => {
        // navigate(`/${productId}/product_details`)
        toggleDrawer()
    }

    return (
        <div>
            <Drawer anchor='left' open={showDrawer} variant='persistent'>
                <Button onClick={toggleDrawer}>
                    <FontAwesomeIcon icon={faXmark} />
                </Button>
                <List>
                    {allCategories.map((category) => (
                        <ListItem
                            key={category.id}
                            className='category-item'
                            onMouseEnter={() => handleMouseEnter(category)}
                            onClick={() => handleCategoryClick(category.id)}
                        >

                            <ListItemText>
                                {category.name}

                            </ListItemText>
                        </ListItem>

                    ))}

                </List>

            </Drawer>
        </div>

    )
}

export default AllCategoriesMiuDrawer;
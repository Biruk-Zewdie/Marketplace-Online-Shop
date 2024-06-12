import React, { useState } from 'react'
import './NavBar2.css'
import { NavLink } from 'react-router-dom'
import AllCategoriesLink from './NavBar2Components/AllCategoriesLink'


const NavBar2 = () => {
    const [isActive, setIsActive] = useState(false)

    const handleClick = () => {
        setIsActive(!isActive)
    }

    return (
        <nav className='navbar2'>
            <NavLink className='inactive'>
                <AllCategoriesLink />
            </NavLink>
            <div className='all-products-link'>
                <NavLink to='/all_products' activeClassName='active' handleClick={handleClick}>
                    All Products
                </NavLink>
            </div>
            <div className='add-category-link'>
                <NavLink to='/addCategory' activeClassName='active' handleClick={handleClick} >
                    Add Category
                </NavLink>
            </div>
            <div className='add-product'>
                <NavLink to='/addProduct' activeClassName='active' handleClick={handleClick}>
                    Add Product
                </NavLink>
            </div>
        </nav>
    )

}

export default NavBar2
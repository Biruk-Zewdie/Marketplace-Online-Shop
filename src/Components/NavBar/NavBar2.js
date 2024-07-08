import React, { useState, useContext} from 'react'
import './NavBar2.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { DrawerContext } from '../../Context/DrawerContext'


const NavBar2 = () => {
    const [isActive, setIsActive] = useState(false);
    const {toggleDrawer} = useContext(DrawerContext)

    const handleClick = () => {
        setIsActive(!isActive)
    }

    return (
        <nav className='navbar2'>
            <div className='inactive' onClick={toggleDrawer}>
                    <FontAwesomeIcon icon={faBars} /> All Caregories
            </div>
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
import React from 'react'
import './NavBar2.css'
import { NavLink } from 'react-router-dom'
import AllCategoriesLink from './NavBar2Components/AllCategoriesLink'


const NavBar2 = () => {

    return (
        <nav className='navbar2'>
            <NavLink> <AllCategoriesLink/></NavLink>
            <NavLink to='/all_products'>All Products</NavLink>
            <NavLink>Featured </NavLink>
            <NavLink>New Products</NavLink>
            <NavLink>Best Sellers</NavLink>
            <NavLink>Electronics</NavLink>
            <NavLink>Clothes</NavLink>
            <NavLink>Shoes</NavLink>
            <NavLink>Kitchen</NavLink>


        </nav>
    )

}

export default NavBar2
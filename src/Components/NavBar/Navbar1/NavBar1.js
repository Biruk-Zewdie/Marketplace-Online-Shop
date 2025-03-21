import React from "react";
import './NavBar1.css'
import { NavLink } from "react-router-dom";
import BrandLogo from "./Navbar1Components/Logo/BrandLogo";
import SearchBar from "./Navbar1Components/SearchBar/SearchBar";
import Account from "../Navbar1/Navbar1Components/AuthAndRegistration/Account";
import CartLink from "./Navbar1Components/CartLink";


const NavBar1 = () => {

    return (
        <nav className='navbar1'>
            <NavLink to='/' className='brand-logo'>
                <BrandLogo />
            </NavLink>
            <div
                className='search-bar'
                to='/search'
            >
                <SearchBar />
            </div>
            <div className='account-container'>
                <Account />
            </div>
            <div className='my-orders-navlink'><NavLink to='/my_orders'>My Orders</NavLink></div>
            <div className='my-wishlist-navlink'><NavLink to='/wish_list'>My WishList</NavLink></div>
            <CartLink />

        </nav>
    )


}

export default NavBar1;
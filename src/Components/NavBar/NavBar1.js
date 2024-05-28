import React, { useState } from "react";
import './NavBar1.css'
import { NavLink } from "react-router-dom";
import BrandLogo from "./NavBar1Components/BrandLogo";
import SearchBar from "./NavBar1Components/SearchBar";
import Account from "./NavBar1Components/Account";
import CartLink from "./NavBar1Components/CartLink";

const NavBar1 = () => {
    const [dropdown, setDropdown] = useState(null)

    const handleMouthEnter = (menu) => {
        setDropdown(menu)
    }

    const handleMouthLeave = () => {
        setDropdown(null)
    }

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
            <div className='account-container'
                onMouseEnter={() => handleMouthEnter('Account')}
                onMouseLeave={handleMouthLeave}
            >
                <Account />
                {dropdown === 'Account' && (<div className='dropdown'>
                    <NavLink to='/Login'>Login</NavLink>
                    <NavLink to='/Create_Account'>Create Account</NavLink>

                </div>)}
            </div>
            <NavLink to='/my_orders'>My Orders</NavLink>
            <CartLink />

        </nav>
    )


}

export default NavBar1;
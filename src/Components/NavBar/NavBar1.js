import React, { useContext, useState } from "react";
import './NavBar1.css'
import { NavLink } from "react-router-dom";
import BrandLogo from "./NavBar1Components/BrandLogo";
import SearchBar from "./NavBar1Components/SearchBar";
import Account from "./NavBar1Components/Account";
import CartLink from "./NavBar1Components/CartLink";
import { UserAuthenticationContext } from "../../Context/UserAuthenticationContext";

const NavBar1 = () => {
    const [dropdown, setDropdown] = useState(null)
    const { logout, currentUserProfile } = useContext(UserAuthenticationContext)

    const handleMouthEnter = (menu) => {
        setDropdown(menu)
    }

    const handleMouthLeave = () => {
        setDropdown(null)
    }
    const handleSignoutBtnClick = () => {
        logout();
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
                    {!currentUserProfile ?
                        <div className='authentication'>
                            <NavLink to='/Login'>Login</NavLink>
                            <NavLink to='/Create_Account'>Create Account</NavLink>
                        </div> :

                        <div onClick={handleSignoutBtnClick}><NavLink to='/Login'>Sign Out</NavLink></div>
                    }

                </div>)}
            </div>
            <div className='my-orders-navlink'><NavLink to='/my_orders'>My Orders</NavLink></div>
            <div className='my-wishlist-navlink'><NavLink to='/wish_list'>My WishList</NavLink></div>
            <CartLink />

        </nav>
    )


}

export default NavBar1;
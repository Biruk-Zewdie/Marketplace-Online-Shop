import React, { useContext, useState } from 'react'
import './Account.css'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { UserAuthenticationContext } from '../../../Context/UserAuthenticationContext'
import Login from '../../../Pages/Login/Login'
import CreateAccount from '../../../Pages/CreateAccount/CreateAccount'

const Account = () => {
    const navigate = useNavigate()
    const { logout, currentUserProfile } = useContext(UserAuthenticationContext)
    const [dropdown, setDropdown] = useState(false)


    const HandleClick = () => {
        navigate('/email_check')
    }
    const handleSignoutBtnClick = () => {
        logout();
    }
    const handleLoginBtnClick = () => {
        Login()
    }
    const handleCreateAccountBtnClick = () => {
        CreateAccount()
    }


    const handleMouseEnter = () => {
        setDropdown(true);
    }

    const handleMouseLeave = () => {
        setDropdown(false);
    }
    return (

        <div
            className='account'
            onClick={HandleClick}
            onMouseEnter={handleMouseEnter}
        >
            {currentUserProfile &&
                <div className='user-profile'>
                    <img className='avatar' src={currentUserProfile.avatar} alt={currentUserProfile.title} />
                    <div className='username' >{currentUserProfile.name}</div>
                </div>
            }
            <div className='dropdown-trigger'>
                Account <FontAwesomeIcon icon={faCaretDown} />
                {dropdown && (
                    <div
                        className='dropdown'
                        onMouseLeave={handleMouseLeave}
                    >
                        {!currentUserProfile ? (
                            <div className='authentication'>
                                <Link to='/Login' onClick={handleLoginBtnClick}>Login</Link>
                                <Link to='/Create_Account' onClick={handleCreateAccountBtnClick}>Create Account</Link>
                            </div>) : (

                            <div className='signout'
                                onClick={handleSignoutBtnClick}
                            >
                                <Link to='/Login'>Sign Out</Link>
                            </div>
                        )}
                    </div>
                )}
            </div >
        </div>

    )
}
export default Account;
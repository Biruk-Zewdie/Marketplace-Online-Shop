import React, { useContext } from 'react'
import './Account.css'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { UserAuthenticationContext } from '../../../Context/UserAuthenticationContext'

const Account = () => {
    const navigate = useNavigate()
    const { currentUserProfile } = useContext(UserAuthenticationContext)

    const HandleClick = () => {
        navigate('/email_check')
    }

    return (

        <div className='account' onClick={HandleClick}>
            {currentUserProfile &&
                <div className='user-profile'>
                    <img classname='avatar' src={currentUserProfile.avatar} alt={currentUserProfile.title} />
                    <div className='username' >{currentUserProfile.name}</div>
                </div>
              
            }
            <div>
                Account <FontAwesomeIcon icon={faCaretDown} />
            </div>

        </div>

    )


}

export default Account;
import React from 'react'
import './Account.css'
import { useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const Account = () => {
    const navigate = useNavigate ()
    
    const HandleClick = () => {
        navigate ('/Login')
    }

    return (
        <div className= 'account' onClick={HandleClick}>
            Account <FontAwesomeIcon icon={faCaretDown}/>
        </div>
    )


}

export default Account;
import React, { useContext, useState } from 'react'
import './CheckEmail.css'
import { useNavigate } from 'react-router-dom'
import { AllUsersDataContext } from '../Context/AllUsersDataContext'

const CheckEmail = () => {
    const [email, setEmail] = useState('')
    const { usersEmail } = useContext(AllUsersDataContext)
    const navigate = useNavigate()

    const handleChange = (event) => {
        setEmail(event.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()

        if (usersEmail.includes(email)) {
            navigate('/Login')
        } else {
            navigate('/Create_Account')
        }
    }
    console.log(usersEmail)


    return (
        <div className='check-email-container'>
            <h2>Sign in or create your account</h2>
            <div>Not sure if you have an account?</div>
            <div> Enter your email and we’ll check for you.</div>
            <form className='check-email-form' onSubmit={handleSubmit}>
                <label className='check-email-label' htmlFor='email'>Email Address</label>
                <input
                    className='check-email-input'
                    type='email'
                    id='email'
                    value={email}
                    onChange={handleChange}
                />
                <button className='check-email-submit-btn' type='submit'>Continue</button>
            </form>
            <div>Securing your personal information is our priority.</div>
        </div>
    )

}

export default CheckEmail
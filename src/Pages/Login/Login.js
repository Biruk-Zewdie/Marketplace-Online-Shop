import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import BrandLogo from '../../Components/NavBar/NavBar1Components/BrandLogo'
import { UserAuthenticationContext } from '../../Context/UserAuthenticationContext'

const Login = () => {
    const initial_state = {
        email: '',
        password: ''
    }
    const [FormData, setFormData] = useState(initial_state)
    // const [accessToken, setAccessToken] = useState (null)
    const { accessToken, setAccessToken, getAccessToken } = useContext(UserAuthenticationContext)
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(FormData => ({ ...FormData, [name]: value }))
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            await getAccessToken(FormData.email, FormData.password)
            setFormData(initial_state)
            navigate('/')
            
        } catch (error) {
            console.error('Error logging in:', error.response || error.message)
            alert('The user email or password is incorrect.')
            setFormData(initial_state)
        }
    }



    const handleCreateAccountButton = () => {
        navigate('/Create_Account')
    }

    return (
        <div className='login'>
            <h2>Log in</h2>
            <form onSubmit={handleFormSubmit}>
                <div className='login-form'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        value={FormData.email}
                        onChange={handleChange}
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        value={FormData.password}
                        onChange={handleChange}
                    />
                    <button className='login-data-submit-btn' type='submit'>Continue</button>
                </div>
            </form>
            <p>By continuing, you agree to marketplace conditions of use and privacy notice</p>
            <h5>New to marketplace?</h5>
            <button className='to-create-account-btn' onClick={handleCreateAccountButton}>Create your marketplace account</button>

        </div>
    )

}

export default Login;
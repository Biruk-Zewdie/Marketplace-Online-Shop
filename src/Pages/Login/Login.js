import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import BrandLogo from '../../Components/NavBar/NavBar1Components/BrandLogo'

const Login = () => {
    const initial_state = {
        email: '',
        password: ''
    }
    const [FormData, setFormData] = useState(initial_state)
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(FormData => ({ ...FormData, [name]: value }))
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            const authenticationResponse = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
                email: FormData.email,
                password: FormData.password
            })
            setFormData(initial_state)

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
        <> 
        <BrandLogo/>
            <h2>Log in</h2>
            <form onSubmit={handleFormSubmit}>
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
                <button type='submit'>Continue</button>
            </form>
            <p>By continuing, you agree to marketplace conditions of use and privacy notice</p>
            <h5>New to marketplace?</h5>
            <button onClick={handleCreateAccountButton}>Create your marketplace account</button>

        </>
    )

}

export default Login;
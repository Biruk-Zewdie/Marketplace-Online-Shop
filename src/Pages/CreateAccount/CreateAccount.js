import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CredentialContext from '../../Context/CredentialContext'
import BrandLogo from '../../Components/NavBar/NavBar1Components/BrandLogo'

const CreateAccount = () => {

    const initial_state = {
        name: '',
        email: '',
        password: '',
        avatar: ''
    }

    const [FormData, setFormData] = useState(initial_state);
    const { allUsersEmail } = useContext(CredentialContext)

    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(FormData => ({ ...FormData, [name]: value }))

    }
    console.log(FormData)

    const HandleFormSubmit = async (event) => {
        event.preventDefault()

        if (allUsersEmail.includes(FormData.email)) {
            alert('You already have an account with this email address.')
            setFormData(initial_state)
            return;
        } else {

            const createAccountResponse = await axios.post('https://api.escuelajs.co/api/v1/users/', {
                name: FormData.name,
                email: FormData.email,
                password: FormData.password,
                avatar: FormData.avatar
            })

            alert('account created successfully!')

            setFormData(initial_state)

        }
    }


    const handleLoginButtonClick = () => {
        navigate('/Login')

    }


    return (
        <>
            <BrandLogo />
            <h2>
                Create Account
            </h2>
            <form onSubmit={HandleFormSubmit}>
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='First and last name'
                    value={FormData.name}
                    onChange={handleChange}
                />
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
                <label htmlFor='avatar'>Avatar Url</label>
                <input
                    type='url'
                    name='avatar'
                    id='avatar'
                    value={FormData.avatar}
                    onChange={handleChange} />

                <button type='submit'>Continue</button>
            </form>

            <p>By creating an account, you agree to marketplace conditions of notice and privacy notice.</p>
            <h5>Already have an account?</h5>
            <button onClick={handleLoginButtonClick}>Log in</button>

            {/* <ul>
            {allUsersEmail.map((Email, index) => <li key={index}>
                {Email}
            </li>)}
        </ul> */}

        </>

    )

}

export default CreateAccount
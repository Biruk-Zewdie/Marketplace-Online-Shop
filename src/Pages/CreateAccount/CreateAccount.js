import React, { useState, useContext, useEffect } from 'react'
import './CreateAccount.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AllUsersDataContext } from '../../Context/AllUsersDataContext'
import BrandLogo from '../../Components/NavBar/NavBar1Components/BrandLogo'

const CreateAccount = () => {

    const initial_state = {
        name: '',
        email: '',
        password: '',
        avatar: ''
    }

    const [FormData, setFormData] = useState(initial_state);
    const { allUsersData, setAllUsersData } = useContext(AllUsersDataContext);
    // const [usersEmail, setUsersEmail] = useState ([])
    const navigate = useNavigate()



    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(FormData => ({ ...FormData, [name]: value }))

    }
    // useEffect(()=> {
    //     const getUsersEmail = () =>{
    //         allUsersData.map ((userData) => 
    //             setUsersEmail (usersEmail => [...usersEmail, userData.email]))

    //     } 
    //     getUsersEmail()


    // }, [])



    const HandleFormSubmit = async (event) => {
        event.preventDefault()

        const usersEmail = allUsersData.map((userData) => userData.email)
        console.log(usersEmail)

        if (usersEmail.includes(FormData.email)) {
            alert('You already have an account with this email address.')
            setFormData(initial_state)
            return;
        }

        if (FormData.name !== '' && FormData.email !== '' && FormData.password !== '' && FormData.avatar !== '') {

            const createAccountResponse = await axios.post('https://api.escuelajs.co/api/v1/users/', {
                name: FormData.name,
                email: FormData.email,
                password: FormData.password,
                avatar: FormData.avatar
            })
            alert('account created successfully!')
            setFormData(initial_state)
            navigate('/Login')
        } else {
            alert('Form filled incorrectly.')
            setFormData(initial_state)
        }
    }


    const handleLoginButtonClick = () => {
        navigate('/Login')

    }


    return (
        <div className='create-account'>
            <h2>
                Create Account
            </h2>

            <form onSubmit={HandleFormSubmit}>
                <div className='create-account-form'>
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

                    <button className='create-account-form-submit-btn' type='submit'>Continue</button>
                </div>
            </form>
            <p>By creating an account, you agree to marketplace conditions of notice and privacy notice.</p>
            <h5>Already have an account?</h5>
            <button className='to-login-page-btn' onClick={handleLoginButtonClick}>Log in</button>

            {/* <ul>
            {allUsersEmail.map((Email, index) => <li key={index}>
                {Email}
            </li>)}
        </ul> */}

        </div>

    )

}

export default CreateAccount
import React, { useContext, useState } from 'react'
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
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email Address</label>
            <input
                type='email'
                id='email'
                value={email}
                onChange={handleChange}
            />
            <button type='submit'>Continue</button>
        </form>
    )

}

export default CheckEmail
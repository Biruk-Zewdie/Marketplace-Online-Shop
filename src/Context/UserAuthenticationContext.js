import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AllUsersDataContext } from './AllUsersDataContext';

export const UserAuthenticationContext = React.createContext();

const getTokenFromLocalStorage = () => {
    let token = localStorage.getItem('token');
    if (token) {
        return (token = JSON.parse(token))
    } else {
        return null;
    }
}

const getUserDataFormLocalStorage = () => {
    let userData = localStorage.getItem('Session_User_Data');
    if (userData) {
        return (userData = JSON.parse(userData))
    } else {
        return null;
    }
}

export const UserAuthenticationProvider = ({ children }) => {

    const [accessToken, setAccessToken] = useState(getTokenFromLocalStorage())
    const [currentUserProfile, setCurrentUserProfile] = useState(getUserDataFormLocalStorage())
    // const {usersEmail} = useContext (AllUsersDataContext)

    const getAccessToken = async (email, password) => {
        try {
            const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
                email,
                password
            })
            setAccessToken(response.data.access_token)
            localStorage.setItem("token", JSON.stringify(accessToken));
            await getCurrentUserProfile(response.data.access_token)      // Fetch and set user profile after login
        } catch (error) {
            console.error('Error logging in:', error.response || error.message);
            throw error; // Re-throw to handle in the component
        }
    }

    console.log(accessToken)


    const getCurrentUserProfile = async (token) => {

        const response = await axios.get(`https://api.escuelajs.co/api/v1/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setCurrentUserProfile(response.data)
        localStorage.setItem('Session_User_Data', JSON.stringify(currentUserProfile))
    }


    useEffect(() => {
        if (accessToken) {
            getCurrentUserProfile(accessToken)
        }
    }, [accessToken])

    const logout = () => {
        setAccessToken(null)
        localStorage.removeItem('token')
        setCurrentUserProfile(null)
        localStorage.removeItem('Session_User_Data')
    }

    console.log(currentUserProfile)

    return (
        < UserAuthenticationContext.Provider value={{ accessToken, setAccessToken, getAccessToken, currentUserProfile, setCurrentUserProfile, logout }}>
            {children}
        </UserAuthenticationContext.Provider>
    )

}
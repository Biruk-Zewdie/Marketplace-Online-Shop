import React, {useState, useEffect} from "react";
import axios from 'axios'

export const AllUsersDataContext = React.createContext ()

export const AllUsersDataProvider = ({children}) => {
    const [allUsersData, setAllUsersData] = useState ([])
    const [usersEmail, setUsersEmail] = useState ([])
    const [userDataerror, setUserDataError] = useState(null)


    const getAllUsersData = async () =>{
        try{
            const Response = await axios.get('https://api.escuelajs.co/api/v1/users')
            setAllUsersData (Response.data)
            const userEmailList = Response.data.map((userData) => userData.email)
            setUsersEmail (userEmailList)

        }catch(error){
            // const errorMessage = error.response?.data?.message || error.message;
            setUserDataError (error.message)
            console.error('Error fetching users data:', error)
        }
    
       
    }

    useEffect(() => {
        getAllUsersData ()
    }, [])

    return (
        <AllUsersDataContext.Provider value={{allUsersData, setAllUsersData, usersEmail, userDataerror}}>
            {children}
        </AllUsersDataContext.Provider>
    )

}

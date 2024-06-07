import React, {useState, useEffect} from "react";
import axios from 'axios'

export const AllUsersDataContext = React.createContext ()

export const AllUsersDataProvider = ({children}) => {
    const [allUsersData, setAllUsersData] = useState ([])
    const [usersEmail, setUsersEmail] = useState ([])


    const getAllUsersData = async () =>{
        const Response = await axios.get('https://api.escuelajs.co/api/v1/users')
        setAllUsersData (Response.data)
        const userEmailList = Response.data.map((userData) => userData.email)
        setUsersEmail (userEmailList)
       
    }

    useEffect(() => {
        getAllUsersData ()
    }, [])

    return (
        <AllUsersDataContext.Provider value={{allUsersData, setAllUsersData, usersEmail}}>
            {children}
        </AllUsersDataContext.Provider>
    )

}

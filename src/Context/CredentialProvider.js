import React, {useState, useEffect} from "react";
import axios from 'axios'
import AllEmailsContext from "./CredentialContext";

const AllCredentialProvider = ({children}) => {
    const [allUsersEmail, setAllUsersEmail] = useState ([])
    const [allUsersPassword, setAllUsersPassword] = useState ([])

    const getAllUsersCredential = async () =>{
        const allUsersResponse = await axios.get('https://api.escuelajs.co/api/v1/users')
        const Emails = allUsersResponse.data.map(user => user.email)
        const Password = allUsersResponse.data.map (user => user.Password)
        setAllUsersEmail (Emails)
        setAllUsersPassword (Password)

    }

    useEffect(() => {
        getAllUsersCredential ()
    }, [])

    return (
        <AllEmailsContext.Provider value={{allUsersEmail, setAllUsersEmail, allUsersPassword, setAllUsersPassword}}>
            {children}
        </AllEmailsContext.Provider>
    )

}

export default AllCredentialProvider
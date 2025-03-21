import React from "react";
import './BrandLogo.css'
import { useNavigate } from "react-router-dom";


const BrandLogo = () => {
    const navigate = useNavigate ()

    const HandleClick = () =>{
        navigate('/')
    }

    return (
        <div className ='logo_image' onClick={HandleClick}>
            <img src="/Images/Logo/Logo-1.png" alt="brand_logo"/>
        </div>
            
    )

}

export default BrandLogo;
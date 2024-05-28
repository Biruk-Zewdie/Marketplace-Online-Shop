import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Login from '../Pages/Login/Login';
import CreateAccount from '../Pages/CreateAccount/CreateAccount';
import Home from '../Pages/Home/Home';
import Products from '../Pages/Products';
import AllProducts from '../Pages/AllProducts';
import ProductDetails from '../Pages/ProductDetails';

const AppRoutes = () => {

    return (
        <>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/Login' element = {<Login/>}/>
            <Route path = '/Create_Account' element = {<CreateAccount/>}/>
            <Route path='/:categoryId/products' element = {<Products/>} />
            <Route path='/all_products' element= {<AllProducts />}/>
            <Route path='/:productId/product_details' element ={<ProductDetails/>}/>
        </Routes>
        </>
    )

}

export default AppRoutes


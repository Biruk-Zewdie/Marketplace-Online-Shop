import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Login from '../Pages/Login/Login';
import CreateAccount from '../Pages/CreateAccount/CreateAccount';
import Home from '../Pages/Home/Home';
import Products from '../Pages/Products';
import AllProducts from '../Pages/AllProducts';
import ProductDetails from '../Pages/ProductDetails';
import AddCategory from '../Pages/Seller/AddCategory';
import AddProduct from '../Pages/Seller/AddProduct';
import ShoppingCartDrawer from '../Pages/Cart/ShoppingCartDrawer';
import Checkout from '../Pages/Checkout';
import CheckEmail from '../Components/CheckEmail';
import WishList from '../Pages/WishList/WishList';
import MyOrders from '../Pages/My orders/MyOrders';


const AppRoutes = () => {

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/email_check' element={<CheckEmail />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Create_Account' element={<CreateAccount />} />
                <Route path='/:categoryId/products' element={<Products />} />
                <Route path='/all_products' element={<AllProducts />} />
                <Route path='/:productId/product_details' element={<ProductDetails />} />
                <Route path='/addCategory' element={<AddCategory />} />
                <Route path='/addProduct' element={<AddProduct />} />
                <Route path='/ShoppingCart' element={<ShoppingCartDrawer />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/wish_list' element={<WishList />} />
                <Route path='/my_orders' element={<MyOrders />} />
            </Routes>
        </>
    )

}

export default AppRoutes


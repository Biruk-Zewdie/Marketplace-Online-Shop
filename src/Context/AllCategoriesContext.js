import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const AllCategoriesContext = React.createContext();

export const AllCategoriesProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState([])
    const [allCategories, setAllCategories] = useState([])

    useEffect(() => {
        const getAllCategories = async () => {
            const response = await axios.get('https://api.escuelajs.co/api/v1/categories')
            setAllCategories(response.data)
        }
        getAllCategories()
    }, [])

    useEffect(() => {
        const getAllProducts = async () => {
            const response = await axios.get('https://api.escuelajs.co/api/v1/products')
            setAllProducts(response.data)

        }
        getAllProducts()
    }, [])

    return (
        <AllCategoriesContext.Provider value={{ allCategories, setAllCategories, allProducts, setAllProducts }}>
            {children}
        </AllCategoriesContext.Provider>

    )
}

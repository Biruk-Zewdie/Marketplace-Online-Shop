import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const AllCategoriesContext = React.createContext();

export const AllCategoriesProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const response = await axios.get('https://api.escuelajs.co/api/v1/categories')
                setAllCategories(response.data)
            } catch (error) {
                setError (error.message);
                console.error('Error fetching categories:', error)
            }
        }
        getAllCategories()
    }, [])


    useEffect(() => {
        const getAllProducts = async () => {
            try{
                const response = await axios.get('https://api.escuelajs.co/api/v1/products')
                setAllProducts(response.data)

            }catch(error){
                setError (error.message)
                console.error('Error fetching products:', error)
            }
        }
        getAllProducts()
    }, [])

    return (
        <AllCategoriesContext.Provider value={{ allCategories, setAllCategories, allProducts, setAllProducts, error}}>
            {children}
        </AllCategoriesContext.Provider>

    )
}

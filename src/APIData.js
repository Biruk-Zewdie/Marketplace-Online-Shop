import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([])
    const [allProductsByCategory, setAllProductsByCategory] = useState([])
    const [category, setCategory] = useState ([])
    const [filterByTitle, setFilterByTitle] = useState ([])
    const [allUsers, setAllUsers] = useState ([])

    useEffect(() => {
        const FetchProducts = async () => {

            const response = await axios.get('https://api.escuelajs.co/api/v1/products')
            console.log(response)
            setProducts(response.data)

        }
        FetchProducts()

    }, [])

    useEffect(() => {
        const FetchAllCategories = async () => {
            const response = await axios.get('https://api.escuelajs.co/api/v1/categories')
            console.log(response)
            setCategories(response.data)
        }
        FetchAllCategories()
    }, [])

    useEffect(() => {
        const FetchAllProductsByCaregory = async () => {
            const response = await axios.get('https://api.escuelajs.co/api/v1/categories/91/products')
            console.log(response.data)
            setAllProductsByCategory(response.data)
        }
        FetchAllProductsByCaregory()
    }, [])


    // useEffect(() => {
    //     const FetchElectronicsCategory = async() => {
    //         const response = await axios.get ('https://api.escuelajs.co/api/v1/categories/2')
    //         console.log(response);
    //         setCategory(response.data)
    //     }
    //     FetchElectronicsCategory ()

    // },[])

    useEffect (() => {
        const FilterByTitle = async () => {
            const response = await axios.get ('https://api.escuelajs.co/api/v1/products/?title=e')
            console.log (response)
            setFilterByTitle (response.data)
        }
        FilterByTitle()
    }, [])


    useEffect (() => {
        const fetchAllUsers = async () => {
            const response = await axios.get ('https://api.escuelajs.co/api/v1/users')
            console.log (response)
            setAllUsers (response.data)
        }
        fetchAllUsers ()
    }, [])

    console.log(allProductsByCategory)

    return (
        // <div>
            <ul>
                {categories.map((category, index) => <li key={index}>
                    {category.name}
                </li>)}
            </ul>
        // </div>
    )

}

export default Products
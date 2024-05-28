import React, {useState, useEffect} from 'react'
import './AllProducts.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([])
    const navigate = useNavigate ()

    useEffect(() => {
        const getAllProducts = async () => {
            const response = await axios.get('https://api.escuelajs.co/api/v1/products')
            setAllProducts(response.data)

        }
        getAllProducts()
    }, [])

    const goToProductDetailsPage = (productId) => {
        navigate (`/${productId}/product_details`)

    }


    return (
        <div className='product-card'>
            {allProducts.map((product, index) =>
                <div
                    className='product-card-container'
                    key={index}
                    onClick={() => goToProductDetailsPage (product.id)}

                >
                    {/* {console.log(product.images)} */}
                    <img
                        className='product-image'
                        
                        src={product.images && product.images.length > 0 ? product.images[0].slice(2,-2) :  'Images/Mproduct.png'}
                        alt={product.title}
                    />
                    <div className='product-price'>${product.price}</div>
                    <div className='product-name'>{product.title}</div>
                </div>)}
        </div>
    )

}

export default AllProducts;
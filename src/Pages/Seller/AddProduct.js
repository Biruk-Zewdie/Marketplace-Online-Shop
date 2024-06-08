import React, { useState } from "react";
import './AddProduct.css'
import axios from "axios";
import BrandLogo from "../../Components/NavBar/NavBar1Components/BrandLogo";

const AddProduct = () => {
    const initial_State = {
        title: '',
        price: '',
        description: '',
        categoryId: '',
        productImage: ''
    }

    const [formData, setFormData] = useState(initial_State)
    const [images, setImages] = useState([''])

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(formData => ({ ...formData, [name]: value }))
    }

    const handleUrlInputChange = (event, index) => {
        const newimages = [...images]
        newimages[index] = event.target.value
        setImages(newimages)

    }

    const addUrlInputFeild = (event) => {
        event.preventDefault()
        setImages(images => [...images, ''])
    }

    const removeUrlInputFeild = (index) => {
        const newimages = images.filter((image, i) => i !== index)
        setImages(newimages)

    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const productData = { ...formData, images: images.filter(image => image !== '') }
        for (const pData in productData) {
            if (productData[pData] === '' || productData[pData].length === 0) {
                alert('Form is not field correctly')
                return;
            }
        }
        const response = await axios.post('https://api.escuelajs.co/api/v1/products/', productData)
    }


    return (
        <div className='add-product-container'>
            <BrandLogo />
            <div className='add-product-header'>Add Product</div>
            <div>
                <form onSubmit={handleSubmit} className='add-product-form'>
                    <div className='product-name-label'>
                        <label htmlFor='title'>Product Name</label>
                    </div>
                    <input
                        className='product-name-input'
                        type='text'
                        id='title'
                        name='title'
                        placeholder='Product Name'
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <div className='product-price-label'>
                        <label htmlFor='price'>Unit Price</label>
                    </div>
                    <input
                        className='product-price-input'
                        type='number'
                        id='price'
                        name='price'
                        placeholder='$ unit Price'
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <div className='product-description-label'>
                        <label htmlFor='description'>Description</label>
                    </div>
                    <textarea
                        className='product-description-input'
                        type='text'
                        id='description'
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <div className='product-category-id-label'>
                        <label htmlFor='categoryId'>Category ID</label>
                    </div>
                    <input
                        className='product-category-id-input'
                        type='number'
                        id='categoryId'
                        name='categoryId'
                        placeholder='Product Category ID'
                        value={formData.categoryId}
                        onChange={handleChange}
                    />
                    <div className='product-image-label'>
                        <label htmlFor='image'> Product image 1</label>
                    </div>
                    <input
                        className='first-product-image-input'
                        type='text'
                        id='image'
                        name='image'
                        value={formData.productImage}
                        onChange={handleChange}
                    />

                    {images.map((image, index) => (
                        <div key={index} className='product-image-url-input'>
                            {/* <div className='product-image-label'> */}
                            <label className='product-image-label' > Product image {index + 2}</label>
                            {/* </div> */}
                            <div className='image-input-remove'>
                                <input
                                    className='product-image-input'
                                    type='text'
                                    id='image'
                                    name='image'
                                    value={image}
                                    onChange={event => handleUrlInputChange(event, index)}
                                />
                                <button className='remove-input-field' onClick={() => removeUrlInputFeild(index)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className='add-input-field'>
                        <button onClick={addUrlInputFeild}>Add more</button>
                    </div>
                    <button className='add-product-submit-btn' type='submit'>Save & Finish</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct;
import React, { useState } from "react";
import './AddCategory.css'
import axios from "axios";
import BrandLogo from "../../Components/NavBar/NavBar1Components/BrandLogo";

const AddCategory = () => {
    const initial_state = { name: '', image: '' }
    const [formData, setFormData] = useState(initial_state)
    // const [createCategory, setCreateCategory] = useState([])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(formData => ({ ...formData, [name]: value }))

    }
    const handleSubmit = async (event) => {
        event.preventDefault()

        // const CreateCategory = async (event) => {
        if (formData.name === '' && formData.image === '') {
            alert('Category name or image Url is not filled correctly')

        } else {
            const response = await axios.post('https://api.escuelajs.co/api/v1/categories/', {
                name: formData.name,
                image: formData.image
            })
            alert('Category created successfully')
        }
        setFormData (initial_state)
        
        // handleChange (initial_state)

        // console.log(response)
        // setCreateCategory (response.data)
        // setFormData (initial_state)
        // }
    }


    return (
        <>

            <div className='add-category-container'>
                <div className='category-header'>Create product category</div>
                <div>
                    <form onSubmit={handleSubmit} className='add-category-form'>
                        <div className='name-label'>
                            <label htmlFor='categoryName'>Category Name</label>
                        </div>

                        <input
                            type='text'
                            className='name-input'
                            id='categoryName'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <div className='url-label'>
                            <label htmlFor="imageUrl">Category Picture</label>
                        </div>

                        <input
                            type='url'
                            id='imageUrl'
                            className='url-input'
                            name='image'
                            value={formData.image}
                            onChange={handleChange}
                        />

                        <div>
                            <button className='create-category-btn' type='submit'>Create Category</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )

}

export default AddCategory;
import React, { useContext } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { AllCategoriesContext } from '../../Context/AllCategoriesContext'

const Home = () => {
    const { allCategories } = useContext(AllCategoriesContext)
    const navigate = useNavigate ()

    const handleCategoryClick = (categoryId) => {
        navigate(`/${categoryId}/products`)
    }

    return (
        <div className='categories-container'>
            {allCategories.map((category, index) =>
                <div className='category-card' key={index} onClick={() => handleCategoryClick(category.id)}>
                    <img className='category-image' src={category.image} alt={category.name} />
                    <div className='category-name'>{category.name}</div>
                </div>
            )}
        </div>
    )
}

export default Home;
import React, { useState, useEffect } from 'react'
import './SearchBar.css'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'


const SearchBar = () => {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [selectedSuggestion, setSelectedSuggestion] = useState(null)
    const [showDropdown, setShowDropdown] = useState(false)
    const navigation = useNavigate()

    const handleChange = (event) => {
        setQuery(event.target.value)
        setShowDropdown(true)
    }

    const FetchSuggestion = async (query) => {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/?title=${query}`)
        console.log(response)
        setSuggestions(response.data)
    }


    useEffect(() => {
        if (query) {
            FetchSuggestion(query)
        } else {
            setSuggestions([])
        }

    }, [query])

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.title)
        setSelectedSuggestion(suggestion)
        setShowDropdown(false)


    }


    const HandleSubmit = (event) => {
        if (selectedSuggestion) {
            navigation(`/${selectedSuggestion.id}/product_details`)
        } else {
            event.preventDefault()
        }
    }
    console.log(suggestions)

    return (
        <>
            <form className='search-form' onSubmit={HandleSubmit}>
                <input
                    className='input-bar'
                    type='text'
                    placeholder='Search Marketplace'
                    value={query}
                    onChange={handleChange}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 300)}
                    onFocus={() => setShowDropdown(true)}
                />
                <button className='search-button' type='submit' > <FontAwesomeIcon icon={faMagnifyingGlass} size='2x' /> </button>
            </form>
            <div className='suggestion-list'>
                {showDropdown && suggestions.length > 0 && suggestions.map((suggestion, index) =>
                    <li className='suggestion' key={index} onClick={() => handleSuggestionClick(suggestion)}>{suggestion.title}</li>
                )
                }
            </div>
        </>
    )
}

export default SearchBar;
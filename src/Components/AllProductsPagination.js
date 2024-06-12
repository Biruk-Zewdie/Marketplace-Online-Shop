import React, { useContext } from "react";
import './AllProductsPagination.css'
import { AllCategoriesContext } from "../Context/AllCategoriesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { } from "@fortawesome/free-solid-svg-icons/faChevronCircleLeft";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const AllProductsPagination = ({ productsPerPage, handlePageChange, currentPage }) => {
    const { allProducts } = useContext(AllCategoriesContext)
    // const [pageNumber, setPageNumber] = useState ([])
    const totalPages = Math.ceil(allProducts.length / productsPerPage)

    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            handlePageChange(page)
        }
    }

    const populatePageNumbers = () => {
        const pageNumbers = []

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i)
        }
        return pageNumbers
    }

    return (

        <div className='pagination-container'>
            <button className='previous' onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}><FontAwesomeIcon icon={faChevronLeft} />Previous</button>
            <div className="page-numbers">
                {populatePageNumbers().map((pageNumber, index) =>
                    <button className={currentPage === pageNumber ? 'active' : 'inactive'}
                        key={index}
                        onClick={() => handleClick(pageNumber)}
                    >
                        {pageNumber}
                    </button>)}
            </div>
            <button
                className='next'
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>

    )
}

export default AllProductsPagination;
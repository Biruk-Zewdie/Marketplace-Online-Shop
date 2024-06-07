import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import AllCategoriesDrawer from '../../../Pages/Product/AllCategoriesDrawer';

const AllCategoriesLink = () => {
    const [showDrawer, setShowDrawer] = useState(false);

    const toggleDrawer = () => {
        setShowDrawer(!showDrawer)
    }
    // const handleDrawerOpen = () => {
    //     setShowDrawer ('open')

    // }

    // const handleDrawerClose = () => {
    //     setShowDrawer ('close')

    // }

    return (
        <div>
            <div onClick={toggleDrawer}>
                <FontAwesomeIcon icon={faBars} /> All Caregories
            </div>
            <AllCategoriesDrawer
                showDrawer={showDrawer}
                toggleDrawer={toggleDrawer}
            
            />
        </div>

    )



}

export default AllCategoriesLink;
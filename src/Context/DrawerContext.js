import React, { useState } from "react";

export const DrawerContext = React.createContext()

export const DrawerProvider = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }

    return (
        <DrawerContext.Provider value={{ toggleDrawer, isDrawerOpen }}>
            {children}
        </DrawerContext.Provider>
    )

}
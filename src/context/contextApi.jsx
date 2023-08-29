import { createContext, useContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../utilities/api";

const Context = createContext();

export const AppContext = ({children}) =>{
    const [loading, setLoading] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('New')
    const [mobileMenu, setMobileMenu] = useState(false)

    useEffect(()=>{
        fetchSelectedCategoryData(selectedCategory)
    },[selectedCategory])


    const fetchSelectedCategoryData = (query)=>{
        setLoading(true)
        fetchDataFromApi(`search/?q=${query}`).then(({contents})=>{
            console.log(contents);
            setSearchResults(contents)
            setLoading(false)
        })
    }
    const value = {
        loading,
        setLoading,
        searchResults,
        selectedCategory, 
        setSelectedCategory,
        mobileMenu, 
        setMobileMenu
    }

    return (
        <Context.Provider 
        value={value}>
            {children}
        </Context.Provider>
    );
}

/**
 * useData() Stored the context data
 * @returns {object}
 */
export const useData = () =>{
    const data = useContext(Context)
    return data;
}
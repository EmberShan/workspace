import { useState, useEffect } from "react";

// get the data 
function getStorageValue(key, defaultValue) {
    const saved = localStorage.getItem(key);
    // JSON.parse is essential for non-string values 
    const initial = JSON.parse(saved);
    // if there is saved data, then return the saved data in the localstorage 
    // if not, then return the defaultValue that should be used
    return initial || defaultValue;
}

// export both the get and set functions for localStorage  
export const useLocalStorage = (key, defaultValue) => {
    // this is to get the key and value in the localStorage 
    // will return default if not getting anything 
    // default is defined when using this (useLocalStorage(defaultValue))
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue); 
    }); 

    // setting the data in localStorage with a key and a value 
    // this automatically updates whenever key and value changes 
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value)); 
    }, [key, value]); 

    // to use this, set const [value, setValue] to this useLocalStorage hook
    return [value, setValue]
}
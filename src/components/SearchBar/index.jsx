import React, { useState } from 'react';
import './search.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        if (e.target.value === ""){
            onSearch(null)
        }
        setQuery(e.target.value);
        onSearch(e.target.value); 
    }; 
    
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search Song, Artist"
                value={query}
                onChange={handleInputChange} 
            /> 
            <img src="/assets/search.png" alt="" className='search-icon' width={"20px"} height={"20px"}  />

        </div>
    );
};

export default SearchBar;

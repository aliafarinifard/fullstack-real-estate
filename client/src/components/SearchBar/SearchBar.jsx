import React from 'react'

// HiLocationMarker
import { HiLocationMarker } from 'react-icons/hi'

const SearchBar = ({ filter, setFilter }) => {
    return (
        <div className='flexCenter search-bar'>
            <HiLocationMarker color='var(--blue)' size={25} />
            <input
                type="text"
                placeholder='Search by title/city/country...'
                value={filter} onChange={(e) => setFilter(e.target.value)}
                style={{ background: "#fff", color: "#252525" }}
            />
            <button className='button'>Search</button>
        </div>
    )
}

export default SearchBar
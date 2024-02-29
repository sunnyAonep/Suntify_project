import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../../config/API';
import ShowSearchList from './ShowSearchList';
import styles from "./SearchWhatUserWant.module.css"
export default function SearchWhatUserWant() {
    const [userType, setUserType] = useState('');
    const [userChoose, setUserChoose] = useState('songs');
    const [search, setSearch] = useState([]);

    const fetchSearch = async (e) => {
        e.preventDefault(); // Corrected from e.privent to e.preventDefault()
        try {
            const response = await axios.get(`${api}/search/${userChoose}?name=${userType}`);
            setSearch(response.data.data.Song);
        } catch (error) {
            console.error('Error fetching search');
        }
    };

    const handleSelectChange = (e) => {
        setUserChoose(e.target.value);
    };

    const handleTypeChange = (e) => {
        setUserType(e.target.value);
    };

    return (
        <div className={styles.searchContainer}> {/* Apply CSS module class */}
        <form className={styles.searchForm} onChange={fetchSearch} onSubmit={fetchSearch}> {/* Apply CSS module class */}
            <label htmlFor="searchSelect">Select Search Type:</label>
            <select id="searchSelect" className={styles.searchSelect} onChange={handleSelectChange} defaultValue={"songs"}> {/* Apply CSS module class */}
                <option value="">Select a search type</option>
                <option value="songs">songs</option>
                <option value="artist">Artist</option>
            </select>
            <input type="text" className={styles.searchInput} onChange={handleTypeChange} /> {/* Apply CSS module class */}
            <button type="submit" className={styles.searchButton}>Search</button> {/* Apply CSS module class */}
        </form>
        {search.length > 0 && (
            <div className={styles.searchResults}> {/* Apply CSS module class */}
                {search.map((song, index) => (
                    <ShowSearchList key={index} song={song} />
                ))}
            </div>
        )}
    </div>
    );
}
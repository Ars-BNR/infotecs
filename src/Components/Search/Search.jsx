import React from 'react'
import styles from './Search.module.css'
const Search = ({ sortBy, handleSortChange, handleKeyPress, searchTerm, handleChange }) => {
    const options = [
        { value: "firstName", label: "Имя" },
        { value: "lastName", label: "Фамилия" },
        { value: "age", label: "Возраст" },
        { value: "gender", label: "Пол" },
        { value: "phone", label: "Телефон" },
        { value: "address.address", label: "Улица" },
        { value: "address.city", label: "Город" }
    ];
    return (
        <>
            <select value={sortBy} onChange={handleSortChange} className={styles.Select}>
                {options.map(option => (
                    <option key={option.value} value={option.value}  >
                        {option.label}
                    </option>
                ))}
            </select>
            <input
                type="text"
                className={styles.Table__input}
                placeholder='Найти по критерию(только один)'
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
            />
        </>
    )
}

export default Search;
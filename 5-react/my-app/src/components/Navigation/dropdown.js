import React, { useState, useEffect } from "react";
import { fetchCategories } from "../../services/categoryService.js";
import "./style.css";

const Dropdown = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categories = await fetchCategories();
                setOptions(categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setOptions([]);
            }
        };
        loadCategories();
    }, []);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleItemClick = (value) => {
        console.log(`Item clicked: ${value}`);
        window.location.replace(`/products/${value}`);
    };

    return (
        <div className={`dropdown-container ${isExpanded ? "expanded" : ""}`}>
            <div
                className="dropdown-toggle"
                onMouseEnter={handleToggle}
            >
                Category
            </div>
            {isExpanded && (
                <ul className="dropdown-list">
                    {options.map((option) => (
                        <li
                            key={option.id}
                            onClick={() => handleItemClick(option.id)}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;

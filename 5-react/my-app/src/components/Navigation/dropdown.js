import React, { useState, useEffect } from "react";
import { fetchCategories } from "../../services/categoryService.js";
import "./style.css";

const Dropdown = () => {
    const [isExpanded, setExpanded] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetchCategories()
            .then((res) => {
                setOptions(res);
            })
            .catch((err) => {
                setOptions([]);
            });
    }, []);

    const handleToggle = () => {
        setExpanded(!isExpanded);
    };

    const handleItemClick = (value) => {
        console.log(`Item clicked: ${value}`);
        window.location.replace(`/products/${value}`);
    };

    return (
        <div className={`dropdown-container ${isExpanded ? "expanded" : ""}`}>
            <div className="dropdown-toggle" onMouseEnter={handleToggle}>
                Category
            </div>
            {isExpanded && (
                <ul className="dropdown-list">
                    {options.map((option) => (
                        <li
                            key={option.name}
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
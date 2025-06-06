import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filters, onFilterChange }) => {
    const handleCheckboxChange = (filterType, value) => {
        onFilterChange(filterType, value);
    };

    return (
        <div className="filter-section">
            <div className="filter-group">
                <h3 className="filter-title">Segments</h3>
                <div className="filter-options">
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            className="filter-checkbox"
                            checked={filters.segments.includes("hatchback")}
                            onChange={() => handleCheckboxChange("segments", "hatchback")}
                        />
                        <span className="filter-label">Hatchback</span>
                    </label>
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            className="filter-checkbox"
                            checked={filters.segments.includes("seden")}
                            onChange={() => handleCheckboxChange("segments", "seden")}
                        />
                        <span className="filter-label">Sedan</span>
                    </label>
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            className="filter-checkbox"
                            checked={filters.segments.includes("suv")}
                            onChange={() => handleCheckboxChange("segments", "suv")}
                        />
                        <span className="filter-label">SUV</span>
                    </label>
                </div>
            </div>

            <div className="filter-group">
                <h3 className="filter-title">Fuel Type</h3>
                <div className="filter-options">
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            className="filter-checkbox"
                            checked={filters.fuelTypes.includes("Petrol")}
                            onChange={() => handleCheckboxChange("fuelTypes", "Petrol")}
                        />
                        <span className="filter-label">Petrol</span>
                    </label>
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            className="filter-checkbox"
                            checked={filters.fuelTypes.includes("Diesel")}
                            onChange={() => handleCheckboxChange("fuelTypes", "Diesel")}
                        />
                        <span className="filter-label">Diesel</span>
                    </label>
                </div>
            </div>

            <div className="filter-group">
                <h3 className="filter-title">Transmission</h3>
                <div className="filter-options">
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            className="filter-checkbox"
                            checked={filters.transitionTypes.includes("Manual")}
                            onChange={() => handleCheckboxChange("transitionTypes", "Manual")}
                        />
                        <span className="filter-label">Manual</span>
                    </label>
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            className="filter-checkbox"
                            checked={filters.transitionTypes.includes("Automatic")}
                            onChange={() => handleCheckboxChange("transitionTypes", "Automatic")}
                        />
                        <span className="filter-label">Automatic</span>
                    </label>
                </div>
            </div>
        </div>
    );
}

Filter.propTypes = {
    filters: PropTypes.shape({
        segments: PropTypes.array.isRequired,
        fuelTypes: PropTypes.array.isRequired,
        transitionTypes: PropTypes.array.isRequired,
    }).isRequired,
    onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
import React, { useState } from "react";
import Filter from "./filter";
import Listing from "./listing";
import PropTypes from 'prop-types';
import './cars.css';

const Cars = ({ results }) => {

  const [filters, setFilters] = useState({
    segments: [],
    fuelTypes: [],
    transitionTypes: [],
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value],
    }));
  };

  const filterResults = () => {
    let filteredResults = [...results];
    
    if (!Array.isArray(filteredResults)) {
      filteredResults = [];
    }
    
    if (filters.segments.length > 0) {
      filteredResults = filteredResults.filter((car) =>
        filters.segments.includes(car.segment)
      );
    }

    if (filters.fuelTypes.length > 0) {
      filteredResults = filteredResults.filter((car) =>
        filters.fuelTypes.includes(car.fuelType)
      );
    }

    if (filters.transitionTypes.length > 0) {
      filteredResults = filteredResults.filter((car) =>
        filters.transitionTypes.includes(car.transitionType)
      );
    }

    return filteredResults;
  };
  
  return (
    <div className="cars-page">
      <div className="cars-container">
        <div className="filter-section">
          <Filter
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="listing-section">
          <Listing results={filterResults()} />
        </div>
      </div>
    </div>
  );
};
Cars.propTypes = {
  results: PropTypes.array.isRequired,
};
export default Cars;
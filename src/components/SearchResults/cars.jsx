import React, { useState } from "react";
import Filter from "./filter";
import Listing from "./listing";
import PropTypes from 'prop-types';

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
  

    const styles = {
          
          submain:{
             
            display:"flex",
            flexDirection:"row",
            width:"100%",
            
          },

          filter:{
             
            flex:"0.4",
            
         
          },

          listing:{
            flex:"1.5"
          }
    };

    return (
      
        <div style={{width:"100%"}}>
             
             <div className="submain" style={styles.submain}>
             <div className="filter" style={styles.filter}>
             <Filter
            filters={filters}
            onFilterChange={handleFilterChange}
          />
             </div>
             <div className="listing" style={styles.listing}>
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
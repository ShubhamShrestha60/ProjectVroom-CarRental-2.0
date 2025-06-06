import React from 'react';
import PropTypes from 'prop-types';



const Filter = ({ filters, onFilterChange }) => {
    
        const handleCheckboxChange = (filterType, value) => {
          onFilterChange(filterType, value);
        };

    const styles = {
        
        filter_Main:{
            
            display:"grid",
            gridTemplateRows:"150px 150px 150px",
            borderRight:"3px solid black",
            
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
            color:"black",
            backgroundColor:"white",
            // height:"100%",
            paddingTop:"30px"

        },

        input:{
            margin: "4px 0 0",
           lineHeight: "normal",
            width: "20px",
            height: "20px",
        
    
        },
        label:{
           
            fontSize:"19px",
            color:"white"
        },


        
    
    }
    return (
        <div className='filter_Main' style={styles.filter_Main}>

            <section className='segments' style={styles.segments}>
                
            <h3 style={{color:"black",paddingLeft:"3vw",borderBottom:"2px solid black",paddingBottom:"10px"}}>Segments</h3>
            <input
               type="checkbox"
               id="hatchback"
               style={{marginLeft:"3vw"}} 
               checked={filters.segments.includes("hatchback")}
               onChange={() => handleCheckboxChange("segments", "hatchback")}
            /> <label htmlFor="">Hatchback</label> <br />
            <input
               type="checkbox"
               id="seden"
               style={{marginLeft:"3vw"}} 
               checked={filters.segments.includes("seden")}
               onChange={() => handleCheckboxChange("segments", "seden")}
            /> <label htmlFor="">Seden</label> <br />
            <input
               type="checkbox"
               id="suv"
               style={{marginLeft:"3vw"}} 
               checked={filters.segments.includes("suv")}
               onChange={() => handleCheckboxChange("segments", "suv")}
            /> <label htmlFor="">SUV</label> 
            

            </section>

            <section className='fuel_type' style={styles.fuel_type}>
              
            <h3 style={{color:"black",paddingLeft:"3vw",borderBottom:"2px solid black",paddingBottom:"10px"}}>Fuel</h3>
            
            <input
                  type="checkbox"
                  id="petrol"
                  style={{marginLeft:"3vw"}} 
                  checked={filters.fuelTypes.includes("Petrol")}
                  onChange={() => handleCheckboxChange("fuelTypes", "Petrol")}
            /> <label htmlFor="">Petrol</label> <br />
            <input
                  type="checkbox"
                  id="diesel"
                  style={{marginLeft:"3vw"}} 
                  checked={filters.fuelTypes.includes("Diesel")}
                  onChange={() => handleCheckboxChange("fuelTypes", "Diesel")}
            /> <label htmlFor="">Diesel</label>
            
            </section>

            <section className='car_type' style={styles.car_type}>
              
            <h3 style={{color:"black",paddingLeft:"3vw",borderBottom:"2px solid black",paddingBottom:"10px"}}>Transistion</h3>
              <input
               type="checkbox"
               id="manual"
               style={{marginLeft:"3vw"}} 
               checked={filters.transitionTypes.includes("Manual")}
               onChange={() => handleCheckboxChange("transitionTypes", "Manual")}
              /> <label htmlFor="">Manual</label><br />
              <input
               type="checkbox"
               id="automatic"
               style={{marginLeft:"3vw"}} 
               checked={filters.transitionTypes.includes("Automatic")}
               onChange={() => handleCheckboxChange("transitionTypes", "Automatic")}
              /><label htmlFor="">Automatic</label> <br />
            </section>


            
        </div>
    );
}
export default Filter;
Filter.propTypes = {
    filters: PropTypes.shape({
      segments: PropTypes.array.isRequired,
      fuelTypes: PropTypes.array.isRequired,
      transitionTypes: PropTypes.array.isRequired,
    }).isRequired,
    onFilterChange: PropTypes.func.isRequired,
  };
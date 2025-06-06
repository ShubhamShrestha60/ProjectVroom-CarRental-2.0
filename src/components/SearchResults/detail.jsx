import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const Detail = () => {
    const { carID } = useParams();
    const [carDetails, setCarDetails] = useState(null);
    const navigate = useNavigate();
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    useEffect(() => {
      const fetchCarDetails = async () => {
        try {
            // Make an HTTP POST request to your backend server
            const response = await axios.post('http://localhost:3002/carDetails', { carID: carID });
            // Assuming the response.data contains the car details
            setCarDetails(response.data);
            localStorage.setItem('carDetails', JSON.stringify(response.data));
        } catch (error) {
            console.error('Error fetching car details:', error);
        }
    };

        fetchCarDetails();
    }, [carID]);
     

    const styles ={
            main:{
                 marginLeft:"100px",
                 backgroundColor:"white",
                 color:"black",
                 height:"80vh"
            },
           sub_main:{
            marginTop:"50px",
               display:"flex"
           },
           
           detail:{
            flex:"0.7",
            display:"flex",
            flexDirection:"column"
           },

           image:{
            flex:"1",
           },
           img:{
              height:"300px"
           },
           information:{

            flex: "1",
            display:"grid",
            marginTop:"-7px",
            gridTemplateColumns:"150px 100px 100px 100px",
            gridGap:"10px",
           boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)", 
           padding: "10px", 
           borderRadius: "5px" ,
           border:"2px solid white"
           },
           payment:{
            flex:"1",
            marginLeft:"100px"
           
           },
           do_payment:{
           
            margin:"center",
            height:"400px",
            width:"400px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)", 
           padding: "10px", 
           borderRadius: "5px" ,
           display:'grid',
           gridTemplateRows:"1fr 0.1fr",
           },
           text_part:{
                 textAlign:"center"
           
           },
           place_order:{
            
           },
           rent_button:{
            width:"100%",
            backgroundColor:"maroon",
            color:"white"
           },
           popup:{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            zIndex: '1000',
            
           },

           option:{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            marginTop:"20px"
           }

    }

   
    const handleBooking = () => {
        if (isLoggedIn) {
            // Navigate to the booking page with carID as state
            navigate(`/booking`, { state: { carID: carDetails.carID } });
        } else {
            // Show login popup
            setShowLoginPopup(true);
        }
    };

    const handleLoginClick = () => {
        // Navigate to login page
        navigate('/login');
    };




    return (
        <div className='main' style={styles.main}>

           





            
            {carDetails && (
                <div className='sub_main' style={styles.sub_main}>

                <div className='detail' style={styles.detail}>
                  <div className='image' style={styles.image}>
                    <img src={`http://localhost:3002/${carDetails.imageUrl}`} alt={`Image of ${carDetails.brand}`}  style={styles.img}/></div>
                    <div className='information' style={styles.information}>
                        <div className='contition'>
                        <h4>Condition</h4>
                        <p>{carDetails.condition}</p>
                        </div>

                        <div className='segment'>
                        <h4>Segment</h4>
                        <p>{carDetails.segment}</p>
                        </div>

                        <div className='fuel_type'>
                        <h4>Condition</h4>
                        <p>{carDetails.fuelType}</p>
                        </div>

                        <div className='brand'>
                        <h4>Brand</h4>
                        <p>{carDetails.brand}</p>
                        </div>
                        
                </div>
                          
                </div>

                
                  
                <div className='info' style={styles.payment}>
                  <div className='do_payment' style={styles.do_payment}>
                     <div className='text_part' style={styles.text_part}>
                     <h1>{carDetails.price}/day</h1>

                     </div>

                     <div className='place_order' style={styles.place_order}>
                     
                      <button  style={styles.rent_button} onClick={handleBooking}> Rent Now</button>
                     </div>
                     
                     {showLoginPopup && (
                <div className="popup" style={styles.popup}>
                    <p>Please log in or sign up to continue.</p>
                    <div className='option' style={styles.option}>
                    <button onClick={handleLoginClick} style={{width:"100px"}}>Login/Signup</button>
                    <button onClick={() => setShowLoginPopup(false)} style={{width:"100px"}}>Close</button>
                    </div>
                    
                </div>
            )}
                  </div>

                </div>
             </div>
            )}
        </div>
    );
};

export default Detail;

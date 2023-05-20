import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import {Navigate} from "react-router-dom";
import axios from "axios";
import DateRangePickerComponent from './DateRangePickerComponent';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function Booking(){

    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberOfGuests,setNumberOfGuests] = useState(1);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [redirect,setRedirect] = useState('');
    const [message, setMessage] = useState('');
    axios.defaults.baseURL = 'http://localhost:8800';

    const [isLoading, setIsLoading] = useState(false);
    

    /* let numberOfNights = 0;
    if (checkIn && checkOut) {
      numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    } */
     
      /* const [selectedRange, setSelectedRange] = useState({
      selection: {
        checkIn: new Date(),
        checkOut: new Date(),
        key: 'selection',
      },
    }); 
    
   


    const  handleSelect = (ranges) => {
       // setSelectedRange({ selection: ranges.selection });
       setSelectedRange({
        checkIn: ranges.selection.startDate,
        checkOut: ranges.selection.endDate,
      });
    };  
    */
   
    async function bookThisPlace(){

         
        setIsLoading(true);
    //  const { checkIn, checkOut } =  await  selectedRange.selection;
      // Handle the selectedRange as needed
    

  // Perform any desired actions with the selected date range
 /*  console.log("Start Date:", checkIn);
  console.log("End Date:", checkOut);
 */
     
      // const checkIn = dateRange.selection.checkIn;

     try{
        const response= await axios.post('ms-reservation/reservation/createReservation' , {
          appartement: '6452c936bf0a60e911de6a8c',
          checkIn: checkIn,
          checkOut:checkOut,
          numberOfGuests: numberOfGuests,
          name: name,
          phone: phone,
          email: email,
          user: '644b00f26adfdd50acfb1324',
          reserved: false,
      //  reservedDates:["2023-05-03" , "2023-05-04", "2023-05-05"],
       user:'644b00f26adfdd50acfb1324',
        reserved:false,
       // price:numberOfNights* 250,
       
     } );
     const bookingId = response.data._id;
     setRedirect(`/account/bookings/${bookingId}`);
    }catch (error){

    } finally {
      setIsLoading(false);
    }

    

    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    
   
  
  
    return(
            <div>
            <div className="bg-white py-32 px-64 shadow  rounded-2xl">
                <div className="text-2xl text-center">
                    Price: $250/per night
                </div>
                <div className="border rounded-2xl mt-4">
                 
                     <div className=" py-4 px-4 ">
                    <label>Check in :</label>
                    <input type="Date"  value={checkIn} onChange={ev =>setCheckIn(ev.target.value)}/> 
                    </div>
                    <div></div>
                    <div className=" py-4 px-4 ">
                    <label>Check out :</label>
                    <input type="Date"  value={checkOut} onChange={ev =>setCheckOut(ev.target.value)} />  
                    </div> 
                         {/* <DateRangePicker
                                ranges={[selectedRange.selection]}
                                onChange={handleSelect} 
                              /*   selectedRange={selectedRange}
                               setSelectedRange={setSelectedRange}  
                             /> 
                         }        
                        */}
                    <div className=" py-4 px-4 border-t ">
                    <label>Number of guests :</label>
                    <input type="number"  value={numberOfGuests} onChange={ev =>setNumberOfGuests(ev.target.value)}/>  
                    </div>
                    
               
                    <div className="py-3 px-4 border-t">
                       <label>Your full name:</label>
                       <input type="text"
                           value={name}
                           onChange={ev => setName(ev.target.value)}/>
                        <label>Phone number:</label>
                        <input type="tel"
                            value={phone}
                            onChange={ev => setPhone(ev.target.value)}/>
                        <label>email:</label>
                        <input type="email"
                            value={email}
                            onChange={ev => setEmail(ev.target.value)}/>
                    </div>
               
                </div>
                
                <button className="primary mt-4" onClick={bookThisPlace}  disabled={isLoading}>
                    Book this place
                    <ToastContainer />
                  {/*   {numberOfNights >  0 && (
                        <span>${numberOfNights * 250}</span>
                    )
                    } */}
                </button>
                <Link to={'/'}>
                <button className="light mt-8">Annuler</button>
               </Link>
               {message && <div>{message}</div>}
            </div>
               
            </div>


    );
    
  
}
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { AppConsts } from "./Routes/AppConsts";
import { ApiRoutes } from "./Routes/ApiRoutes";
import { PageRoutes } from "./Routes/PageRoutes";

export default function Booking() {

  function GetUserId() {
    var token = localStorage.getItem(AppConsts.JwtTokenKey);
    var body = JSON.parse(atob(token.split('.')[1]));
    return body.nameid;
  }
  console.log('user' + GetUserId())


  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState('');
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState('');

  const queryParameters = new URLSearchParams(window.location.search)
  // const AppartementId = queryParameters.get("id") 
  const { id } = useParams();
  console.log(id)

  axios.defaults.baseURL = AppConsts.ServerAddress;

  const [appartement, setAppartement] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [reservedDates, setReservedDates] = useState([]);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);


  let numberOfNights = 0;
  if (date[0].startDate && date[0].endDate) {
    numberOfNights = differenceInCalendarDays(new Date(date[0].startDate), new Date(date[0].endDate));
  }


  try {
    
    axios.get(ApiRoutes.GetAppartementById.replace("{id}", id)).then(async (response) => {
      setAppartement(response.data)
      const reservedDates = await appartement.reservedDates;
      setPrice(numberOfNights * appartement.price);
      /*  for (let i = 0; i < reservedDates.length; i++) {
           const date=new Date(reservedDates[i])
           const dateString= date.toLocaleDateString();
        
       };  */
      setReservedDates(reservedDates);

    });



  } catch (error) {

  }
  //   console.log(appartement)
  axios.post("")
  //  const reservedDates = appartement.reservedDates;
  console.log(reservedDates);

  /* const formattedDates = reservedDates.map((isoDate) => {
   const date = new Date(isoDate);
 
   const options = {
     weekday: "short",
     month: "short",
     day: "2-digit",
     year: "numeric",
     hour: "2-digit",
     minute: "2-digit",
     second: "2-digit",
     timeZoneName: "long"
   };
 
   return date.toLocaleString("en-US", options);
 });
 
 console.log(formattedDates); */






  /*   const isDateDisabled = (date) => {
      return reservedDates.includes(date);
    }; */





  async function bookThisPlace() {


    setIsLoading(true);

    try {
      const response = await axios.post(ApiRoutes.CreateReservationForAppartement.replace("{id}", id), {
        //appartement:id,
        checkIn: date[0].startDate,
        checkOut: date[0].endDate,
        numberOfGuests: numberOfGuests,
        name: name,
        phone: phone,
        email: email,
        price: price,
        user: '644b00f26adfdd50acfb1324',
        reserved: false,
        //  reservedDates:["2023-05-03" , "2023-05-04", "2023-05-05"],


        // price:numberOfNights* 250,

      });
      const bookingId = response.data._id;
      setRedirect(PageRoutes.AccountBookingById.replace(":id", bookingId));
    } catch (error) {


    } finally {
      setIsLoading(false);
    }



  }

  if (redirect) {
    return <Navigate to={redirect} />
  }


  console.log(new Date('2023-06-12'));

  return (
    <div>

      <div className="bg-white py-32 px-64 shadow  rounded-2xl" >
        <div className="text-2xl text-center"  >
          price per night : {appartement.price}
        </div>
        <div className="border rounded-2xl mt-4">

          {/*  <div className=" py-4 px-4 ">
                    <label>Check in :</label>
                    <input type="Date"  value={checkIn} onChange={ev =>setCheckIn(ev.target.value)}/> 
                    </div>
                    <div></div>
                    <div className=" py-4 px-4 ">
                    <label>Check out :</label>
                    <input type="Date"  value={checkOut} onChange={ev =>setCheckOut(ev.target.value)} />  
                    </div>   */}
          {/*  <DateRangePicker
                                ranges={[selectedRange.selection]}
                                onChange={handleSelect} 
                                selectedRange={selectedRange}
                               setSelectedRange={setSelectedRange}  
                             />  */}
          <div className=" py-4 px-4 ml-32 border-t ">

            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              // disabledDates={isDateDisabled}
              disabledDates={[new Date('2023-06-20'), new Date('2023-06-21')]}
              className="date"
              minDate={new Date()}
            />
          </div>

          <div className=" py-4 px-4 border-t ">
            <label>Number of guests :</label>
            <input type="number" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} />
          </div>


          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input type="text"
              value={name}
              onChange={ev => setName(ev.target.value)} />
            <label>Phone number:</label>
            <input type="tel"
              value={phone}
              onChange={ev => setPhone(ev.target.value)} />
            <label>email:</label>
            <input type="email"
              value={email}
              onChange={ev => setEmail(ev.target.value)} />

          </div>



        </div>

        <button className="primary mt-4" onClick={bookThisPlace} disabled={isLoading}>
          Book this place
          <ToastContainer />
          {numberOfNights > 0 && (

            <span>$ {appartement.price * numberOfNights}</span>
          )
          }
        </button>
        <Link to={PageRoutes.Home}>
          <button className="light mt-8">Annuler</button>
        </Link>
        {message && <div>{message}</div>}
      </div>

    </div>






  );


}
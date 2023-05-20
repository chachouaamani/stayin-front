import AccountNav from "../AccountNav.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

import {differenceInCalendarDays, format} from "date-fns";
import {Link} from "react-router-dom";
import BookingDates from "../BookingDates";
import { PageRoutes } from "../Routes/PageRoutes.js";
import { ApiRoutes } from "../Routes/ApiRoutes.js";

axios.defaults.baseURL = 'http://localhost:8800';


export default function BookingsPage() {
  const [bookings,setBookings] = useState([]);
  useEffect(() => {
    axios.get(ApiRoutes.GetReservation).then(response => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      
    </div>
  );

}
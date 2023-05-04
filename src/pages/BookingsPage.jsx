import AccountNav from "../AccountNav.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

import {differenceInCalendarDays, format} from "date-fns";
import {Link} from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings,setBookings] = useState([]);
  useEffect(() => {
    axios.get('/ms-reservation/reservation/getReservations').then(response => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      
    </div>
  );

}
import AccountNav from "../AccountNav.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

import { ApiRoutes } from "../Routes/ApiRoutes.js";
import { AppConsts } from "../Routes/AppConsts";

axios.defaults.baseURL = AppConsts.ServerAddress;


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
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";
import { ApiRoutes } from "../Routes/ApiRoutes";
axios.defaults.baseURL = 'http://localhost:8800';

export default function BookingPage() {
  const {id} = useParams();
  const [reservation,setReservation] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get(ApiRoutes.GetReservation).then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id);
        if (foundBooking) {
          setReservation(foundBooking);
        }
      });
    }
  }, [id]);

  if (!reservation) {
    return '';
  }

  return (
    <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
    <div>
      <h2 className="text-2xl mb-4">Your booking information:</h2>
      <BookingDates reservation={reservation} />
    </div>
    <div className="bg-primary p-6 text-white rounded-2xl">
      <div>Total price</div>
      <div className="text-3xl">${reservation.price}</div>
    </div>
  </div>

  );
}
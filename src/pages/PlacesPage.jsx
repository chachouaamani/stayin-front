import axios from "axios";
import { useEffect, useState } from "react";

export default function PlacesPage() {
const [places, setPlaces]= useState([]);

//fonction pour afficher les appartements de chaque user
/* useEffect(()=>{
    axios.get("/userPlaces", (data)=>{
        setPlaces(data)
    })

}, []) */




    return(
       <div>places page</div>
    );
}
//import PhotosUploader from "../PhotosUploader.jsx";
import { useEffect, useState } from "react";

import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import Perks from "../Perks.jsx";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8800';
export default function PlacesFormPage() {
  // const {id} = useParams();
  const [title, setTitle] = useState('');

  const [wilaya, setWilaya] = useState('');
  const [comun, setComun] = useState('');
  const [street, setStreet] = useState('');

  const [addedPhotos, setAddedPhotos] = useState([]);

  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [price_month, setPriceMonth] = useState(900);
  const [redirect, setRedirect] = useState(false);
  /* useEffect(() => {
     if (!id) {
       return;
     }
     axios.get('/places/'+id).then(response => {
        const {data} = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
     });
   }, [id]);*/
  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }


  var storageMicroserviceLink = "https://localhost:5000/file/"
  function uploadPhoto(ev) {
    var file = {
      FileType: "",
      Content: ""
    }
    const files = ev.target.files;


    var parts = files[0].name.split(".");
    file.FileType = "." + parts[parts.length - 1];

    var reader = new FileReader();

    reader.onload = async function (e) {
      file.Content = window.btoa(window.unescape(encodeURIComponent(reader.result)));

      axios.post('https://localhost:5000/file/upload', file, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {

        setAddedPhotos(prev => {
          return [...prev, response.data];
        });

        console.log(addedPhotos)
      }
      )



      // var fileId = await fetch("https://localhost:5000/file/upload", 
      // { method: "post",
      //   body: file,
      //   headers: { "Content-Type": "application/json" } 
      // });


    }
    reader.readAsText(files[0]);


    // console.log(files[0])

    // const data = new FormData();
    // for (let i = 0; i < files.length; i++) {
    //   data.append('photos', files[i]);
    // }
    // axios.post('/upload', data, {
    //   headers: { 'Content-type': 'multipart/form-data' }
    // }).then(response => {
    //   const { data: filenames } = response;
    //   setAddedPhotos(prev => {
    //     return [...prev, ...filenames];
    //   });
    // })
  }

  function removePhoto(ev, filename) {
    ev.preventDefault();
    setAddedPhotos(prev => {
      return [...addedPhotos.filter(photo => photo !== filename)]
    })

  }

  async function savePlace(ev) {
    ev.preventDefault();
    await axios.post('/places', {
      title, wilaya, comun, street, addedPhotos,
      description, perks, extraInfo,

      checkIn, checkOut, maxGuests, price

    });
    setRedirect(true);


  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt" />

        {preInput('Address', 'specify your exact address')}

        <div class="p-6 border border-gray-300 sm:rounded-md">

          <label class="block mb-6">
            <span class="text-gray-700">Wilaya</span>
            <input
              name="Wilaya" type="text" class=" block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50 "
              placeholder="wilaya" value={wilaya} onChange={ev => setWilaya(ev.target.value)}
            />
          </label>

          <label class="block mb-6">
            <span class="text-gray-700">commune</span>
            <input
              name="comune" type="text" class=" block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50 "
              placeholder="commune" value={comun} onChange={ev => setComun(ev.target.value)}
            />
          </label>
          <label class="block mb-6">
            <span class="text-gray-700">Street</span>
            <input
              name="street" type="text" class=" block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50 "
              placeholder="street" value={street} onChange={ev => setStreet(ev.target.value)}
            />
          </label>

        </div>



        {preInput('Photos', 'more = better')}

        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {addedPhotos.length > 0 && addedPhotos.map(fileId => (
            <div className="h-32 flex relative" key={fileId}>
              <button onClick={ev => removePhoto(ev, fileId)} className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
              <img src={storageMicroserviceLink + fileId} className="rounded-2xl w-full object-cover" />

            </div>
          ))}

          <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
            <input type="file" multiple className="hidden" onChange={uploadPhoto} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
            Upload
          </label>

        </div>

        {preInput('Description', 'description of the place')}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />



        {preInput('Perks', 'select all the perks of your place')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput('Extra info', 'house rules, etc')}
        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
        {preInput('Check in&out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-2 " >
          {/*
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input type="text"
                   value={checkIn}
                   onChange={ev => setCheckIn(ev.target.value)}
                   placeholder="14"/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input type="text"
                   value={checkOut}
                   onChange={ev => setCheckOut(ev.target.value)}
                   placeholder="11" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input type="number" value={maxGuests}
                   onChange={ev => setMaxGuests(ev.target.value)}/>
          </div> */}



          <div class="p-6 border border-gray-300 sm:rounded-md flex flex-row ">

            <label class="block mb-6">
              <span class="text-gray-700">Check in time</span>
              <input
                name="Wilaya" type="text" class=" block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300
        focus:ring
        focus:ring-indigo-200
        focus:ring-opacity-50 "
                value={checkIn}
                onChange={ev => setCheckIn(ev.target.value)}
                placeholder="14"
              />
            </label>

            <label class="block mb-6">
              <span class="text-gray-700">Check out time</span>
              <input
                name="comune" type="text" class=" block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300
        focus:ring
        focus:ring-indigo-200
        focus:ring-opacity-50 "
                value={checkOut}
                onChange={ev => setCheckOut(ev.target.value)}
                placeholder="11"
              />
            </label>

            <label class="block mb-6">
              <span class="text-gray-700">Max number of guests</span>
              <input
                name="comune" type="text" class=" block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300
        focus:ring
        focus:ring-indigo-200
        focus:ring-opacity-50 "
                value={maxGuests}
                onChange={ev => setMaxGuests(ev.target.value)}
              />
            </label>

          </div>

          <div class="p-6 border border-gray-300 sm:rounded-md flex flex-row">

            <label class="block mb-6">
              <span class="text-gray-700">Price per night</span>
              <input
                name="Wilaya" type="text" class=" block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300
        focus:ring
        focus:ring-indigo-200
        focus:ring-opacity-50 "
                value={price} onChange={ev => setPrice(ev.target.value)}
              />
            </label>

            <label class="block mb-6">
              <span class="text-gray-700">price per month</span>
              <input
                name="comune" type="text" class=" block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300
        focus:ring
        focus:ring-indigo-200
        focus:ring-opacity-50 "
                value={price_month}
                onChange={ev => setPriceMonth(ev.target.value)}
              />
            </label>



          </div>
          {/*  <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input type="number" value={price}
                   onChange={ev => setPrice(ev.target.value)}/>
          </div>

          <div>
            <h3 className="mt-2 -mb-1">Price for month</h3>
            <input type="number" value={price_month}
                   onChange={ev => setPriceMonth(ev.target.value)}/>
          </div> */}
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
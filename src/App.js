import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BookingPage from './pages/BookingPage';
import Layout from  "./Layout";
import BookingWidget from './BookingWidget';

import axios from "axios";
import Widget from './Widget';
import Booking from './Booking';

import BookingsPage from "./pages/BookingsPage";
import PlacesPage from "./pages/PlacesPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import { PageRoutes } from './Routes/PageRoutes';
import PlacesFormPage from './pages/PlacesFormPage'

axios.defaults.baseURL = 'http://localhost:8800';


function App() {


  //const [appartement,setAppartement] = useState(null);
 /*  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(response => {
      setAppartement(response.data);
    });
  }, [id]);

  if (!appartement) return ''; */
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/account/bookings/:id" element={<BookingPage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/account/bookings" element={<BookingsPage />} />
        <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
       <Route path='/account/:subpage/:action' element={<PlacesFormPage />}/>
       <Route path='/places/:id' element={<PlacePage />}/>
      
      
      </Route>
     <Route>
        <Route path={PageRoutes.Login} element={<LoginPage/>} />
        <Route path={PageRoutes.SignUp} element={<SignupPage/>} />
      </Route>

    </Routes>
    </BrowserRouter>
    
   
  );
}

export default App;

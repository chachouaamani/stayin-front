import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
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
import SignupPage from './pages/SignupPage';

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
  // var isLogin =true; // windows.location == PageRoutes.Login;
  
  // if(isLogin){
  //   return <SignupPage/>;
  // }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage/>} />
        <Route path={PageRoutes.Login} element={<LoginPage/>} />
        <Route path={PageRoutes.SignUp} element={<SignupPage/>} />
        <Route path="/account/bookings/:id" element={<BookingPage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/account/bookings" element={<BookingsPage />} />
        <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
      </Route>
    
    </Routes>
    </BrowserRouter>
    
   
  );
}

export default App;

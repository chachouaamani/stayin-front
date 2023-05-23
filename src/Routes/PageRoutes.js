export class PageRoutes{    
    static Login = "/login";
    static SignUp  = "/signup";

    static Home  = "/";
    
    static Account = "/account";
    static NewPlace = "/account/places/new";
    static PlaceById = "/places/:id";
    static BookingById = "/booking/:id";
    static AccountPlaces = "/account/places";
    static AccountBookings = "/account/bookings";
    static AccountBookingById = "/account/bookings/:id";
    static AccountSubpageAction = "/account/:subpage/:action";

}
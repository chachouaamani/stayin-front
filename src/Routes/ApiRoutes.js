export class ApiRoutes {
    static Login = "/login";
    static SignUp = "/signup";

    static UploadFile = "/storage/file/upload";
    static FileById = "/storage/file/{id}";

    static GetReservations = "/ms-reservation/reservation/getReservations";
    static CreateReservation = "ms-reservation/reservation/createReservation"
    static GetAppartementById = "ms-reservation/reservation/getAppartementId/{id}";
    static ReservationGetPlaces = "/ms-reservation/places/{id}";
    static CreateReservationForAppartement = "ms-reservation/reservation/createReservation/{id}"
    
    static GetPlaceById = "/places/{id}";
    static GetAllPlaces = "/places/all";
    static AddPlace = "/places";
    static Profile = "/profile";



}

import { PageRoutes } from "../Routes/PageRoutes";
import { UserLoginModel } from "../Models/UserLoginModel";
import { ApiRoutes } from "../Routes/ApiRoutes";
import { AppConsts } from "../Routes/AppConsts";


// Whether we are currently logging in
var mLoggingIn = false;

// Displays errors to the user
function ShowErrors(newErrors) {
  if (newErrors) {
    document.querySelector(".errors").innerHTML = "";

    for (let i = 0; i < newErrors.length; i++) {
      var div = document.createElement("div");
      div.textContent = newErrors[i];
      document.querySelector(".errors").appendChild(div);
    }

  }
}

// Logs the user into the app
async function Login(event) {
  // If we are already performining log in
  if (mLoggingIn)
    // Don't do anything
    return;

  // Set login in to true
  mLoggingIn = true;


  // Set button content indicating we are performing log in
  event.target.textContent = "Logging in ...";


  // Get the email entered by the user
  var email = document.querySelector("#loginemail").value;

  // Get the password entered by the user
  var password = document.querySelector("#loginpassword").value;

  // Create the result of the login request
  var result = null;

  try {
    // Send login request to the server
    result = await fetch(AppConsts.ServerAddress + ApiRoutes.Login, {
      method: "POST",
      body: JSON.stringify(new UserLoginModel(email, password)),
      headers: { "Content-Type": "application/json" }
    });
  }
  // If there was an error
  catch (error) {
    // Ignore it
  }

  // If we have no result
  if (result == null) {
    // Tell the user that we couldn't connect to the server
    var errors = [];
    errors.push("Could not connect to the server")
    ShowErrors(errors);
  }
  // Otherwise, if we got a response
  else {
    // Get response body
    var body = await result.json();

    // If login has succeeded
    if (body.Successful) {

      // Store the jwt token
      localStorage.setItem(AppConsts.JwtTokenKey, body.Body);

      // Redirect the user to the home page
      window.location = PageRoutes.Home;
    }
    else {
      // Display errors
      ShowErrors(body.Errors);
    }
  }

  // Set logging in to false
  mLoggingIn = false;

  // Set button content back to log in
  event.target.textContent = "Log in";
}




const LoginPage = () => {
  return (
    <div className="login-page">
      <img src="/assets/house.jpg" alt="house image" />
      <div>
        <div>
          <div className="background"></div>
          <div className="content">
            <div className="left">
              <div>Welcome back</div>
              <div>Find your perfect place to call home, with just a tap of your finger.</div>
            </div>
            <div className="right">
              <div>Log in <span>or</span>&nbsp;<a href={PageRoutes.SignUp}>Sign up ?</a></div>
              <input type="email" placeholder="email" id="loginemail" /><br />
              <input type="password" placeholder="password" id="loginpassword" /><br />
              <button onClick={(e) => Login(e)}>Login</button>
            </div>
          </div>
        </div>
      </div>
      <div className="errors">
      </div>
    </div>
  );

}

export default LoginPage
import { PageRoutes } from "../Routes/PageRoutes";
import { UserCreateModel } from "../Models/UserCreateModel";
import { ApiRoutes } from "../Routes/ApiRoutes";
import { AppConsts } from "../Routes/AppConsts";


// Whether we are currently signing in
var mSigningIn = false;

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

// Signs the user in the app
async function Signup(event) {
  // If we are already performining sign up
  if (mSigningIn)
    // Don't do anything
    return;

  // Set signing in to true
  mSigningIn = true;

  // Set button content indicating we are performing sign up
  event.target.textContent = "Signing in ...";

  // Get the email entered by the user
  var email = document.querySelector("#email").value;

  // Get the password entered by the user
  var password = document.querySelector("#password").value;

  // Get the username entered by the user
  var username = document.querySelector("#username").value;

  // Create the result of the signup request
  var result = null;

  try {
    // Send signup request to the server
    result = await fetch(AppConsts.ServerAddress + ApiRoutes.SignUp, {
      method: "POST",
      body: JSON.stringify(new UserCreateModel(email, password, username)),
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
  // Otherwise, if we have a response
  else {
    // Get response body
    var body = await result.json();

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

  // Set signin in to false
  mSigningIn = false;

  // Set button content back to sign up
  event.target.textContent = "Sign up";
}












const SignupPage = () => {
  return (
    <div className="signup-page">
      <img src="/assets/house.jpg" alt="house image" />
      <div>
        <div>
          <div className="background"></div>
          <div className="content">
            <div className="left">
              <div>Welcome</div>
              <div>Find your perfect place to call home, with just a tap of your finger.</div>
            </div>
            <div className="right">
              <div>Sign up <span>or</span>&nbsp;<a href={PageRoutes.Login}>Log in ?</a></div>
              <input type="email" placeholder="email" id="email" /><br />
              <input type="text" placeholder="username" id="username" /><br />
              <input type="password" placeholder="password" id="password" /><br />
              <button onClick={async (e) => await Signup(e)}>Sign up</button>
            </div>
          </div>
        </div>
      </div>
      <div className="errors">
      </div>
    </div>
  );

}

export default SignupPage
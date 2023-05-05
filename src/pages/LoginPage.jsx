
import { PageRoutes } from "../Routes/PageRoutes";

const LoginPage = () => {
  return (
    <div class="login-page">
      <img src="/assets/house.jpg" alt="house image" />
      <div>
        <div>
          <div class="background"></div>
          <div class="content">
            <div class="left">
              <div>Welcome back</div>
              <div>Find your perfect place to call home, with just a tap of your finger.</div>
            </div>
            <div class="right">
              <div>Log in <span>or</span>&nbsp;<a href={PageRoutes.SignUp}>Sign up ?</a></div>
              <input type="email" placeholder="email" id="loginemail" /><br />
              <input type="password" placeholder="password" id="loginpassword" /><br />
              <button >Login</button>
            </div>
          </div>
        </div>
      </div>
      <div class="errors">
        <div>display errors here</div>
      </div>
    </div>
  );

}

export default LoginPage
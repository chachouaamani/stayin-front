
import { PageRoutes } from "../Routes/PageRoutes";

const SignupPage = () => {
  return (
    <div class="signup-page">
    <img src="/assets/house.jpg" alt="house image"/>
    <div>
        <div>
            <div class="background"></div>
            <div class="content">
                <div class="left">
                    <div>Welcome</div>
                    <div>Find your perfect place to call home, with just a tap of your finger.</div>
                </div>
                <div class="right">
                    <div>Sign up <span>or</span>&nbsp;<a href={PageRoutes.Login}>Log in ?</a></div>
                    <input type="email" placeholder="email" id="email"/><br/>
                    <input type="text" placeholder="username" id="username"/><br/>
                    <input type="password" placeholder="password" id="password"/><br/>
                    <button>Sign up</button>
                </div>
            </div>
        </div>
    </div>
    <div class="errors">
        <div>display errors here mkladj fmalk fmal kmdlak mfldk</div>
    </div>
</div>
  );

}

export default SignupPage
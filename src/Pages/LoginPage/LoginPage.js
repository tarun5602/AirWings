import CustomInput from "../../components/CustomInput/CustomInput";
import { IoIosMail } from "react-icons/io";
import "./styles.css";
import { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import COLOR from "../../Config/color";
import ASSETS from "../../assets";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../Config/routes";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Login");
  const navigate = useNavigate();

  const handleForgetPassword = () => {
    alert("Forget Password functionality is not implemented yet.");
  };

  const handleSignUp = () => {
    navigate(ROUTES.registerPage)
  };

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail && !trimmedPassword) {
      toast("Please enter email and password.");
      return;
    }

    if (!trimmedEmail) {
      toast("Please enter your email.");
      return;
    }

    if (!trimmedPassword) {
      toast("Please enter your password.");
      return;
    }

    try {
      setButtonText("Please wait...");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}login/`,
        {
          email: trimmedEmail,
          password: trimmedPassword,
        }
      );

      if (response.data.status) {
        toast(response.data.message);
        localStorage.setItem("isLogin", true);
        localStorage.setItem("username", response.data.data.username);
        navigate(ROUTES.homePage);
      } else {
        toast("Login failed. Please check your credentials.");
      }
      setButtonText("Login");
    } catch (error) {
      toast("Login failed. Please check your credentials.");
      setButtonText("Login");
    }
  };

  return (
    <div className="loginPageBaseContainer">
      <div className="loginPageContentCardBaseContainer">
        <div className="loginPageContentContainer">
          <div className="loginPageHeaderContainer">
            <h1>Welcome Back</h1>
          </div>
          <div className="loginPageInputContainer">
            <div className="loginPageInputTitleContainer">
              <p>Please enter your details</p>
            </div>
            <div className="loginPageInputBaseContainer">
              <CustomInput
                value={email}
                onChange={(text) => {
                  setEmail(text.target.value);
                }}
                placeholder={"Enter email"}
                Icon={IoIosMail}
                type={"email"}
              />
              <CustomInput
                value={password}
                onChange={(text) => {
                  setPassword(text.target.value);
                }}
                placeholder={"Enter Password"}
                type={"password"}
                isSecureEntry={true}
              />
            </div>
            <div className="loginPageInputForgetContainer">
              <p onClick={handleForgetPassword}>Forget Password ?</p>
            </div>
          </div>
          <div className="loginPageButtonContainer">
            <CustomButton
              title={buttonText}
              backgroundColor={COLOR.secondaryColor}
              color={COLOR.whiteColor}
              onClick={handleLogin}
            />
            <p id="signUpText">
              Don't have an account? <span onClick={handleSignUp}>SignUp</span>
            </p>
          </div>
        </div>
        <div
          className="loginPageImageContainer"
          style={{
            backgroundImage: `url(${ASSETS.loginBackImage})`,
          }}
        ></div>
      </div>
      <ToastContainer draggable autoClose={5000} transition={Bounce} />
    </div>
  );
}

export default LoginPage;

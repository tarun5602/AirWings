import CustomInput from "../../components/CustomInput/CustomInput";
import { IoIosMail } from "react-icons/io";
import "./styles.css";
import { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import COLOR from "../../Config/color";
import ASSETS from "../../assets";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForgetPassword = () => {
    alert("Forget Password functionality is not implemented yet.");
  };

  const handleSignUp = () => {
    alert("Sign Up functionality is not implemented yet.");
  };

  return (
    <div className="loginPageBaseContainer">
      <div className="loginPageContentCardBaseContainer">
        <div className="loginPageContentContainer">
          <div className="loginPageHeaderContainer">
            <h1>Welcome Back 👋</h1>
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
              title={"Login"}
              backgroundColor={COLOR.secondaryColor}
              color={COLOR.whiteColor}
              onClick={() => alert("Login Done")}
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
    </div>
  );
}

export default LoginPage;
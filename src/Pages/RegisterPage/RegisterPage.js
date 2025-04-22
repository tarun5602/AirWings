import CustomInput from "../../components/CustomInput/CustomInput";
import { IoIosMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import "./styles.css";
import { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import COLOR from "../../Config/color";
import ASSETS from "../../assets";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import axios from "axios";
function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerDone, setRegisterDone] = useState(false);
  const [registerButtonText, setRegisterButtonText] = useState("Register");

  // const customProgressBarStyle = {
  //   backgroundColor: "var(--secondaryColor)",
  // };

  const handleRegister = async () => {
    if (name == "" || email == "") {
      toast("Please enter your Credentials");
    } else if (registerButtonText === "Register") {
      setRegisterButtonText("Set Password");
      setRegisterDone(true);
    } else if (password == "" || confirmPassword == "") {
      toast("Password and Confirm Password cannot be empty");
    } else if (password !== confirmPassword) {
      toast("Passwords do not match");
    } else {
      setRegisterButtonText("Please wait...");
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}register/`,
          { username: name, email, password }
        );
        console.log(response);
      } catch (error) {
        toast("Failed to register. Please try again later.");
      }
      setRegisterButtonText("Set Password");
    }
  };

  return (
    <div className="RegisterPageBaseContainer">
      <div className="RegisterPageContentCardBaseContainer">
        <div className="RegisterPageContentContainer">
          <div className="RegisterPageHeaderContainer">
            <h1>Create an account👌</h1>
          </div>
          <div className="RegisterPageInputContainer">
            <div className="RegisterPageInputTitleContainer">
              <p>Please enter your details</p>
            </div>
            <div className="RegisterPageInputBaseContainer">
              <CustomInput
                value={name}
                onChange={(text) => {
                  setName(text.target.value);
                }}
                placeholder={"Enter name"}
                Icon={FaUser}
                type={"text"}
                disable={registerDone}
              />
              <CustomInput
                value={email}
                onChange={(text) => {
                  setEmail(text.target.value);
                }}
                placeholder={"Enter email"}
                Icon={IoIosMail}
                type={"email"}
                disable={registerDone}
              />
              {registerDone && (
                <>
                  <CustomInput
                    value={password}
                    onChange={(text) => {
                      setPassword(text.target.value);
                    }}
                    placeholder={"Enter Password"}
                    isSecureEntry={true}
                  />
                  <CustomInput
                    value={confirmPassword}
                    onChange={(text) => {
                      setConfirmPassword(text.target.value);
                    }}
                    placeholder={"Confirm Password"}
                    isSecureEntry={true}
                  />
                </>
              )}
            </div>
          </div>
          <div className="RegisterPageButtonContainer">
            <CustomButton
              title={registerButtonText}
              backgroundColor="var(--baseColor)"
              color={COLOR.secondaryColor}
              onClick={handleRegister}
              border={"2px solid var(--secondaryColor)"}
            />
          </div>
        </div>
        <div
          className="RegisterPageImageContainer"
          style={{
            backgroundImage: `url(${ASSETS.registerBackImage})`,
          }}
        ></div>
      </div>
      <ToastContainer draggable autoClose={5000} transition={Bounce} />
    </div>
  );
}

export default RegisterPage;

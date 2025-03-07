import CustomInput from "../../components/CustomInput/CustomInput";
import { IoIosMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import "./styles.css";
import { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import COLOR from "../../Config/color";
import ASSETS from "../../assets";
function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerDone, setRegisterDone] = useState(false);
  const [registerButtonText, setRegisterButtonText] = useState("Register");

  const handleRegister = () => {
    if (registerButtonText === "Register") {
      setRegisterButtonText("Set Password");
      setRegisterDone(true);
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
              backgroundColor= "var(--baseColor)"
              color={COLOR.secondaryColor}
              onClick={handleRegister}
              border={"2px solid var(--secondaryColor)"}
            />
          </div>
        </div>
        <div className="RegisterPageImageContainer" style={{
            backgroundImage: `url(${ASSETS.registerBackImage})`,
          }}>
        
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

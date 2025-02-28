import CustomInput from "../../components/CustomInput/CustomInput";
import { IoIosMail } from "react-icons/io";
import "./styles.css";
import { useState } from "react";
// import CustomButton from "../../components/CustomButton/CustomButton";
// import COLOR from "../../Config/color";
// import ASSETS from "../../assets";
function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          </div>
          <div className="RegisterPageButtonContainer"></div>
        </div>
        <div className="RegisterPageImageContainer"><h1>ewguegheujh gugugbu</h1></div>
      </div>
    </div>
      
  );
}

export default RegisterPage;
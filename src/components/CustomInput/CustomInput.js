import "./styles.css";
import COLOR from "../../config/color";
import { IoMdEye } from "react-icons/io";
import { LuEyeClosed } from "react-icons/lu";
import { useState } from "react";

function CustomInput({
  placeholder,
  Icon,
  type,
  isSecureEntry = false,
  value,
  onChange,
}) {
  const [showText, setShowText] = useState(false);

  return (
    <div className="customInputBaseContainer">
      <div className="customInputContainer">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder ? placeholder : "Enter text"}
          type={isSecureEntry ? (showText ? "text" : "password") : type}
        />
      </div>
      {Icon ? (
        <div className="customInputIconContainer">
          <Icon color={COLOR.borderColor} />
        </div>
      ) : (
        isSecureEntry && (
          <div
            className="customInputIconContainer"
            onClick={() => {
              setShowText(!showText);
            }}
          >
            {showText ? (
              <IoMdEye color={COLOR.borderColor} />
            ) : (
              <LuEyeClosed color={COLOR.borderColor} />
            )}
          </div>
        )
      )}
    </div>
  );
}

export default CustomInput;
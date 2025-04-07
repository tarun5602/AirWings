import "./styles.css";
import COLOR from "../../Config/color.js";
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
  disable = false,
  width
}) {
  const [showText, setShowText] = useState(false);

  return (
    <div className="customInputBaseContainer" style={{
      backgroundColor: disable ? `var(--disableColor)` : `var(--whiteColor)`,
      width: width
    }} >
      <div className="customInputContainer">
        <input 
          disabled={disable}
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
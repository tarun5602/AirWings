import COLOR from "../../Config/color.js";
import "./styles.css";

function CustomButton({ backgroundColor, color, onClick, title, border }) {
  return (
    <div
      className="customButtonBaseContainer"
      onClick={onClick}
      style={{
        backgroundColor: backgroundColor ?? COLOR.secondaryColor,
        color: color ?? COLOR.blackColor,
        border,
      }}
    >
      <p>{title}</p>
    </div>
  );
}

export default CustomButton;
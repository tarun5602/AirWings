import COLOR from "../../Config/color.js";
import "./styles.css";

function CustomButton({ backgroundColor, color, onClick, title, border, width, height }) {
  return (
    <div
      className="customButtonBaseContainer"
      onClick={onClick}
      style={{
        backgroundColor: backgroundColor ?? COLOR.secondaryColor,
        color: color ?? COLOR.blackColor,
        border,
        width: width,
        height: height
      }}
    >
      <p>{title}</p>
    </div>
  );
}

export default CustomButton;
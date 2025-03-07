import "./styles.css";
import CustomButton from "../CustomButton/CustomButton";
import { IoAirplaneSharp } from "react-icons/io5";

function CustomNavBar() {
  return (
    <div className="customNavBarBaseContainer">
      <div className="navbarLogoContainer">
        <div className="navbarLogoBaseContainer">
          <h2>
            Air
            <span
              style={{
                color: "var(--secondaryColor)",
                textDecorationLine: "underline",
              }}
            >
              Wings
            </span>
          </h2>
          <IoAirplaneSharp className="aeroPlaneIcon" size={24} />
        </div>
      </div>
      <div className="customNavBarLinkContainer"></div>
      <div className="customNavBarProfileContainer"></div>
    </div>
  );
}

export default CustomNavBar;

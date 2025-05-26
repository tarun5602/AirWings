import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import CustomButton from "../CustomButton/CustomButton";
import { IoAirplaneSharp, IoReorderThreeOutline } from "react-icons/io5";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../Config/routes";
import { useLocation } from "react-router-dom";

function CustomNavBar() {
  const location = useLocation();
  const sideBarRef = useRef();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedIsLogin = localStorage.getItem("isLogin") === "true";
    setUsername(storedUsername);
    setIsLogin(storedIsLogin);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
    navigate(ROUTES.loginPage);
  };

  const linkList = [
    { title: "Home", path: ROUTES.homePage },
    { title: "Services", path: ROUTES.servicesPageFlightBookingPage },
    { title: "About Us", path: ROUTES.aboutUsPage },
    { title: "Contact Us", path: ROUTES.contactUsPage },
    { title: "FAQs", path: ROUTES.FAQPage },
  ];

  return (
    <div className="customNavbarBaseContainer">
      <IoReorderThreeOutline className="threeLineIcon" size={30} />
      <div className="customNavbarLogoContainer">
        <div className="customNavbarLogoBaseContainer">
          <h2 onClick={() => navigate(ROUTES.homePage)}>
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
      <div className="customNavbarLinkContainer">
        {linkList.map((item) => (
          <p
            key={item.title}
            onClick={() => navigate(item.path)}
            className={location.pathname === item.path ? "active-link" : ""}
          >
            {item.title}
          </p>
        ))}
      </div>
      <div className="customNavbarProfileContainer">
        {isLogin ? (
          <div
            className="customNavbarProfile"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <div className="customNavbarProfileIcon">
              {username.charAt(0).toUpperCase()}
            </div>
            {showDropdown && (
              <div className="customNavbarDropdownContainer">
                <div className="customNavbarDropdownProfileContainer">
                  {`${username.charAt(0).toUpperCase()}${username.slice(1)}`}
                </div>
                <div
                  className="customNavbarDropdownProfileContainer"
                  onClick={() => {
                    setShowDropdown(false);
                    navigate(ROUTES.profilePage);
                  }}
                >
                  Profile
                </div>
                <div
                  className="customNavbarDropdownLogoutContainer"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="customNavbarProfileButtonContainer">
            <CustomButton
              title={"Login"}
              onClick={() => navigate(ROUTES.loginPage)}
              color={"var(--secondaryColor)"}
              backgroundColor={"transparent"}
              border={"2px solid var(--secondaryColor)"}
            />
            <CustomButton
              title={"Register"}
              onClick={() => navigate(ROUTES.registerPage)}
              color={"var(--secondaryColor)"}
              backgroundColor={"transparent"}
              border={"2px solid var(--secondaryColor)"}
            />
          </div>
        )}
      </div>
      <div className="customSideNavbarBaseContainer" ref={sideBarRef}>
        <div className="customSideNavbarLinks">
          {linkList.map((item) => (
            <p key={item.title} onClick={() => navigate(item.path)}>
              {item.title}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomNavBar;

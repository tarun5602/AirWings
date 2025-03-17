import React, {useEffect, useRef, useState} from "react";
import "./styles.css";
import CustomButton from "../CustomButton/CustomButton";
import { IoAirplaneSharp } from "react-icons/io5";
import { IoReorderThreeOutline } from "react-icons/io5";
import gsap from "gsap";

function CustomNavBar() {

  const sideBarRef = useRef();

  const linkList = [
    {
      title: "Home",
    },
    {
      title: "Services",
    },
    {
      title: "About Us",
    },
    {
      title: "Contact Us",
    },
    {
      title: "Blog",
    },
    {
      title: "FAQs",
    },
  ];

  return (
    <div className="customNavbarBaseContainer">
      <IoReorderThreeOutline className="threeLineIcon" size={30} />
      <div className="customNavbarLogoContainer">
        <div className="customNavbarLogoBaseContainer">
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
      <div className="customNavbarLinkContainer">
        {linkList.map((item) => {
          return <p>{item.title}</p>;
        })}
      </div>
      <div className="customNavbarProfileContainer">
        <div className="customNavbarProfileButtonContainer">
          <CustomButton
            title={"Login"}
            color={"var(--secondaryColor)"}
            backgroundColor={"transparent"}
            border={"2px solid var(--secondaryColor)"}
          />
          <CustomButton
            title={"Register"}
            color={"var(--secondaryColor)"}
            backgroundColor={"transparent"}
            border={"2px solid var(--secondaryColor)"}
          />
        </div>
      </div>
      <div className="customSideNavbarBaseContainer" ref={sideBarRef}>
        <div className="customSideNavbarLinks">
          {linkList.map((item) => {
            return <p>{item.title}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default CustomNavBar;

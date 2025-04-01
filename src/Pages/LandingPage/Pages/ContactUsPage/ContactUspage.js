import React from "react";
import "./styles.css";
import { useState } from "react";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import { FaFacebookF } from "react-icons/fa";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { SlSocialLinkedin } from "react-icons/sl";
import ASSETS from "../../../../assets";
import CustomFooter from "../../../../components/CustomFooter/CustomFooter";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { PiBuildingOfficeFill } from "react-icons/pi";
import { ImClock } from "react-icons/im";

export default function ContactUsPage() {
  return (
    <div className="contactUsBaseContainer">
      <div className="contactUsContainer">
        <div className="contactUsFormContainer">
          <h1>Contact Us</h1>
           <CustomInput placeholder={"Name"} />
           <CustomInput placeholder={"Email"} />
           <CustomInput placeholder={"Message"} />
           <CustomButton />
        </div>
        <div className="contactUsInfoContainer">
          <div className="contactUsInfoDesignContainer"></div>
          <div className="contactUsInfoDesignContainer infoSecondDesign"></div>
          <div className="contactUsInfoCredentialsContainer">
            <h1>Info</h1>
            <MdOutlineMailOutline />
            <p>airwings@gmail.com</p>
            <LuPhone />
            <p>926-486-2249</p>
            <PiBuildingOfficeFill />
            <p>23, Main Street, AnyTown, USA</p>
            <ImClock />
            <p>8:00AM - 5:00PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

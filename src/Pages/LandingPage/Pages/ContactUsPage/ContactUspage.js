import React from "react";
import "./styles.css";
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
    <div className="contactUsBaseContainer" style={{backgroundImage:`url(${ASSETS.contactUsImage})`}}>
      <div className="contactUsContainer">
        <div className="contactUsFormContainer">
          <h1>Contact Us</h1>
          <CustomInput placeholder={"Name"} width={"400px"} />
          <CustomInput placeholder={"Email"} width={"400px"} />
          <CustomInput placeholder={"Message"} width={"400px"} />
          <CustomButton title={"Submit"} width={"400px"} height={"30px"} />
        </div>
        <div className="contactUsInfoContainer">
          <div className="contactUsInfoDesignContainer"></div>
          <div className="contactUsInfoDesignContainer infoSecondDesign">
            <FaFacebookF />
            <FaInstagram />
            <RiTwitterXFill />
            <SlSocialLinkedin />
          </div>
          <div className="contactUsInfoCredentialsContainer">
            <h1>Info</h1>
            <div classname="contactUsInfoCredentialsInfoContainer">
              <MdOutlineMailOutline />
              <p>airwings@gmail.com</p>
            </div>
            <div classname="contactUsInfoCredentialsInfoContainer">
              <LuPhone />
              <p>926-486-2249</p>
            </div>
            <div classname="contactUsInfoCredentialsInfoContainer">
              <PiBuildingOfficeFill />
              <p>23, Main Street, AnyTown, USA</p>
            </div>
            <div classname="contactUsInfoCredentialsInfoContainer">
              <ImClock />
              <p>8:00AM - 5:00PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

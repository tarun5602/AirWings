import React from "react";
import "./styles.css";
import { useState } from "react";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import { FaFacebookF } from "react-icons/fa";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { SlSocialLinkedin } from "react-icons/sl";

export default function ContactUsPage() {
  return (
    <div className="contactUsBaseContainer">
      <h1
        style={{
          padding: 60,
          fontWeight: "bold",
        }}
      >
        CONTACT US
      </h1>
      <div className="contactUsContainer">
        <h2
          style={{
            color: "var(--grayColor)",
            paddingBottom: "60px",
          }}
        >
          We're here to help and answer any query's you might have. We hope that
          you have a great time travelling with us.
        </h2>
        <div className="contactUsMainContainer">
          <div className="credentialsContactUsContainer">
            <h1>Get in Touch</h1>
            <h2>Phone</h2>
            <h4>+91 (6969)123-456</h4>
            <h4>+91 (9696)987-654</h4>
            <div className="socialMediaIconsCredentialsContactUsContainer">
            <FaFacebookF />
            <FaInstagram />
            <RiTwitterXFill />
            <SlSocialLinkedin />
            </div>
          </div>
          <div className="formContactUsContainer">
              <h1>Send us a Message</h1>
              <CustomInput placeholder={"Name"} />
              <CustomInput placeholder={"email"} />
              <CustomInput placeholder={"subject"} />
              <CustomInput placeholder={"Message"} />
               <CustomButton title={"Submit"} />
          </div>
        </div>
      </div>
    </div>
  );
}

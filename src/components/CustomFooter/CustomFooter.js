import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { LuFacebook } from "react-icons/lu";
import { LuInstagram } from "react-icons/lu";
import { LuLinkedin } from "react-icons/lu";
import { BsTwitterX } from "react-icons/bs";

export default function CustomFooter() {
  return (
    <div className="customFooterBaseContainer">
      <div className="customFooterContainer">
        <div className="customFooterSocialMediaLink">
          <h3>AirWings</h3>
          <p>Connecting dreams, one flight at a time. Experience the joy of seamless travel with SkyWings.</p>
        </div>
        <div className="cutomFooterQuickLinksContainer">
          <h3>Quick Links</h3>
        </div>
        <div className="customFooterServicesContainer">
          <h3>Services</h3>
        </div>
        <div className="customfooterContactUsContainer">
          <h3>Contact Us</h3>
        </div>
      </div>
      <p style={{textAlign: "center"}}>© 2024 SkyWings Airlines. All rights reserved.</p>
    </div>
  );
}

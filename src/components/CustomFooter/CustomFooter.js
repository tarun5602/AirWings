import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { LuFacebook } from "react-icons/lu";
import { LuInstagram } from "react-icons/lu";
import { LuLinkedin } from "react-icons/lu";
import { BsTwitterX } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { LuMail } from "react-icons/lu";
import { FaLongArrowAltRight } from "react-icons/fa";
import ROUTES from "../../Config/routes";

export default function CustomFooter() {
  const navigate = useNavigate();

  const linkList = [
    {
      title: "Home",
      path: ROUTES.homePage,
    },
    {
      title: "Services",
      path: ROUTES.servicesPage,
    },
    {
      title: "About Us",
      path: ROUTES.aboutUsPage,
    },
    {
      title: "Contact Us",
      path: ROUTES.contactUsPage,
    },
    {
      title: "Blog",
    },
    {
      title: "FAQs",
    },
  ];

  return (
    <div className="customFooterBaseContainer">
      <div className="customFooterContainer">
        <div className="customFooterSocialMediaLink">
          <h3>AirWings</h3>
          <p>
            Connecting dreams, one flight at a time. Experience the joy of
            seamless travel with SkyWings.
          </p>
          <div className="customFooterSocialMediaIconsContainer">
            <LuFacebook size={22} />
            <LuInstagram size={22} />
            <LuLinkedin size={22} />
            <BsTwitterX size={22} />
          </div>
        </div>
        <div className="cutomFooterQuickLinksContainer">
          <h3>Quick Links</h3>
          <div className="customFooterQuickLinks">
            {linkList.map((item) => {
              return (
                <p onClick={() => navigate(item.path)}>
                  <FaLongArrowAltRight size={13} /> {item.title}
                </p>
              );
            })}
          </div>
        </div>
        <div className="customFooterServicesContainer">
          <h3>Services</h3>
          <div className="customFooterServices">
          <p>Flight Booking</p>
          <p>Flight Information</p>
          <p>Baggage/CheckIn</p>
          <p>Deals</p>
          <p>Support</p>
          </div>
        </div>
        <div className="customfooterContactUsContainer">
          <h3>Contact Us</h3>
          <div className="customFooterContactUs">
            <div className="customFooterContactUsLocation">
              <MdOutlineLocationOn size={25} />
              <span>23 Main Street, Anytown, USA</span>
            </div>
            <div className="customFooterContactUsCall">
              <LuPhoneCall size={20} />
              <span>+91 9780260155</span>
            </div>
            <div className="customFooterContactUsEmail">
              <LuMail size={20} />
              <span>contact@airwings.com</span>
            </div>
          </div>
        </div>
      </div>
      <p
        style={{
          textAlign: "center",
          paddingBottom: "20px",
        }}
      >
        © 2024 SkyWings Airlines. All rights reserved.
      </p>
    </div>
  );
}

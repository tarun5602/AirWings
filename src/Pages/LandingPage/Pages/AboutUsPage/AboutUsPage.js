import React from "react";
import "./styles.css";
import ASSETS from "../../../../assets";
import CustomFooter from "../../../../components/CustomFooter/CustomFooter";
import { MdOutlineSecurity } from "react-icons/md";
import { LuHeartHandshake } from "react-icons/lu";
import { HiOutlineGlobe } from "react-icons/hi";

export default function AboutUsPage() {
  const Mission = [
    {
      id: 1,
      title: 25,
      description: "Years of Experience",
      icon: "",
    },
    {
      id: 2,
      title: 500,
      description: "Destination",
      icon: "",
    },
    {
      id: 3,
      title: "1M",
      description: "Happy Customers",
      icon: "",
    },
    {
      id: 4,
      title: 1000,
      description: "Flight Routes",
      icon: "",
    },
  ];

  const Values = [
    {
      id: 1,
      title: "Saftey First",
      description:
        "Your safety is our top priority. We maintain the highest standards in aviation safety.",
      icon: <MdOutlineSecurity size={35} />,
    },
    {
      id: 2,
      title: "Customer  Care",
      description:
        "We are committed to providing exceptional service at every step of your journey.",
      icon: <LuHeartHandshake size={35}/>,
    },
    {
      id: 3,
      title: "Global Reach",
      description:
        "Connect to over 500 destinations worldwide with our extensive network.",
      icon: <HiOutlineGlobe size={35}/>,
    },
  ];
  return (
    <div className="aboutUsBaseContainer">
      <section
        className="aboutUsImageBaseContainer"
        style={{ backgroundImage: `url(${ASSETS.aboutUsPageImage})` }}
      >
        <div className="aboutUsInfoContainer">
          <h1
            style={{
              color: "var(--whiteColor)",
            }}
          >
            About Us
          </h1>
        </div>
      </section>
      <section className="aboutUsMissionBaseContainer">
        <div className="aboutUsMissionTextContainer">
          <h1
            style={{
              color: "var(--baseColor)",
              padding: "50px",
            }}
          >
            Our Mission
          </h1>
          <p
            style={{
              color: "var(--grayColor)",
              paddingRight: "100px",
              paddingLeft: "100px",
              paddingBottom: "80px",
              textAlign: "justify",
            }}
          >
            At SkyWings, we are more than just an airline. We are your trusted
            partner in creating unforgettable travel experiences. Our mission is
            to connect people and places with comfort, reliability, and
            sustainability at the heart of everything we do.
          </p>
        </div>
        <div className="aboutUsMissionAnimationContainer">
          {Mission.map((item) => (
            <div key={item.id} className="aboutUsMissionCardContainer">
              <div className="aboutUsMissionTitle">{item.title}</div>
              <div className="aboutUsMissionDescription">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="aboutUsOurValuesBaseContainer">
        <div className="aboutUsValuesHeading">
          <h1>Our Values</h1>
        </div>
        <div className="aboutUsValuesCardContainer">
          {Values.map((item) => (
            <div key={item.id} className="aboutUsValuesContainer">
              <div className="aboutUsValueIcon">
                {item.icon}
              </div>
              <div className="aboutUsValueTitle">
                <h1>{item.title}</h1>
              </div>
              <div className="aboutUsValueDescription">
                {item.description}
              </div>
            </div>
          )
        )}
        </div>
      </section>
      <CustomFooter/>
    </div>
  );
}

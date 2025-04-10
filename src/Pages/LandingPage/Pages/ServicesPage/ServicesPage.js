import React from "react";
import "./styles.css";
import { Outlet, useNavigate } from "react-router-dom";
import ROUTES from "../../../../Config/routes";
import CustomButton from "../../../../components/CustomButton/CustomButton";

export default function ServicesPage() {
  const navigate = useNavigate();

  const sidebarLinks = [
    {
      title: "Flight Booking",
      path: ROUTES.servicesPageFlightBookingPage,
    },
    {
      title: "Baggage Tracking",
      path: ROUTES.servicesPageBaggageTrackingPage,
    },
    {
      title: "Support",
      path: ROUTES.servicesPagesSupportPage,
    },
  ];

  return (
    <div className="servicesPageBaseContainer">
      <div className="servicesPageSideBarContainer">
        <h2
          style={{
            paddingTop: "20px",
            color: "var(--baseColor)"}}
        >
          Services
        </h2>
        {sidebarLinks.map((item) => (
          <CustomButton 
            title={item.title}
            backgroundColor={"transparent"}
            border={"1px solid var(--baseColor)"}
            color={"var(--baseColor)"}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
      <div className="servicesPageContentContainer">
        <Outlet />
      </div>
    </div>
  );
}

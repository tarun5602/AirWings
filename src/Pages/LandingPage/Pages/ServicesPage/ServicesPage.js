import React from "react";
import "./styles.css";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../../../../Config/routes";
import CustomButton from "../../../../components/CustomButton/CustomButton";

export default function ServicesPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarLinks = [
    {
      title: "Flight Booking",
      path: ROUTES.servicesPageFlightBookingPage,
    },
    {
      title: "My Trip",
      path: ROUTES.servicesPageMyTripsPage,
    },
    {
      title: "Baggage Tracking",
      path: ROUTES.servicesPageBaggageTrackingPage,
    },
    {
      title: "Feedback",
      path: ROUTES.servicesPagesSupportPage,
    },
  ];

  return (
    <div className="servicesPageBaseContainer">
      <div className="servicesPageSideBarContainer">
        <h2
          style={{
            paddingTop: "20px",
            color: "var(--baseColor)",
          }}
        >
          Services
        </h2>
        {sidebarLinks.map((item) => (
          <CustomButton
            title={item.title}
            backgroundColor={
              location.pathname === item.path
                ? "var(--secondaryColor)"
                : "transparent"
            }
            color={"var(--baseColor)"}
            border={"1px solid var(--baseColor)"}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
      <div className="servicesPageContentContainer">
        <div className="servicesPageUpperContainer">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

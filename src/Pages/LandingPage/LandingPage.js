import { useState } from "react";
import "./styles.css";
import CustomNavBar from "../../components/CustomNavBar/CustomNavBar";
import { Outlet } from "react-router-dom";
function LandingPage() {
  return (
    <div className="landingPageBaseContainer">
      <div className="landingPageNavbarContainer">
        <CustomNavBar />
      </div>
      <div className="landingPageRouteContainer">
        <Outlet />
      </div>
    </div>
  );
}

export default LandingPage;

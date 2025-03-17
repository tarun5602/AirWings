import { useState } from "react";
import "./styles.css";
import CustomNavBar from "../../components/CustomNavBar/CustomNavBar";
import { Outlet } from "react-router-dom";
function LandingPage() {
  return (
    <div className="loginPageBaseContainer">
      <div className="loginPageNavbarContainer">
        <CustomNavBar />
      </div>
      <div className="loginPageRouteContainer">
        <Outlet />
      </div>
    </div>
  );
}

export default LandingPage;

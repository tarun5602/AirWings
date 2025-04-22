import { useEffect, useState } from "react";
import "./styles.css";
import CustomNavBar from "../../components/CustomNavBar/CustomNavBar";
import { Outlet, useNavigate } from "react-router-dom";
import CustomFooter from "../../components/CustomFooter/CustomFooter";
import ROUTES from "../../Config/routes";
function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLogin")) {
      navigate(ROUTES.homePage);
    } else {
      navigate(ROUTES.loginPage);
    }
  }, []);

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

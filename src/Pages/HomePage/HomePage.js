import { useState } from "react";
import "./styles.css";
import CustomNavBar from "../../components/CustomNavBar/CustomNavBar";
function HomePage() {
  return (
    <div className="homePageBaseContainer">
      <div className="homePageNavbarContainer">
        <CustomNavBar />
      </div>
      <div className="homePageRouteContainer" >
      </div>
    </div>
  );
}

export default HomePage;
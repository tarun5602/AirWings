import React from "react";
import "./styles.css";
import CustomNavBar from "../../components/CustomNavBar/CustomNavBar";
import CustomFooter from "../../components/CustomFooter/CustomFooter";
import CustomInput from "../../components/CustomInput/CustomInput";

export default function ProfilePage() {
  return (
    <div className="profilePageBaseContainer">
      <div className="profilePageCustomNavbarBaseContainer">
        <CustomNavBar />
      </div>
      <div className="profilePageContentContainer">
        <div className="profilePageContentProfileBaseContainer">
          <div className="profilePageContentIconContainer">
            T
          </div>
          <div className="profilePageContentNameContainer">
            Tarun
          </div>
        </div>
        <div className="profilePageContentTableBaseContainer">
          <div className="profilePageContentTableContainer">
            <h2>Personal Information</h2>
            <form className="profilePageContentFormBaseContainer">
              <div className="profilePageContentFormContainer">
                <label>First Name</label>
                <CustomInput placeholder={"Joban"} />
              </div>
              <div className="profilePageContentFormContainer">
                <label>Last Name</label>
                <CustomInput placeholder={"Sir"} />
              </div>
              <div className="profilePageContentFormContainer">
                <label>Email Address</label>
                <CustomInput placeholder={"abc@gmail.com"} />
              </div>
              <div className="profilePageContentFormContainer">
                <label>Phone Number</label>
                <CustomInput placeholder={"+91 9876543210"} />
              </div>
              <div className="profilePageContentFormContainer profilePageContentAddressContainer">
                <label>Address</label>
                <CustomInput placeholder={"123 Aviation Street"} />
              </div>
              <div className="profilePageContentFormContainer">
                <label>Date of Birth</label>
                <CustomInput type={"date"}/>
              </div>
              <div className="profilePageContentFormContainer">
                <label>Country</label>
                <CustomInput placeholder={"India"} />
              </div>
              <div className="profilePageContentFormContainer">
                <label>Postal Code</label>
                <CustomInput placeholder={"143001"} />
              </div>
              <div className="profilePageContentFormContainer">
                <label>State</label>
                <CustomInput placeholder={"Punjab"} />
              </div>
              <div className="profilePageContentFormContainer">
                <label>City</label>
                <CustomInput placeholder={"Amritsar"} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="profilePageCustomFooterBaseContainer">
        <CustomFooter />
      </div>
    </div>
  );
}

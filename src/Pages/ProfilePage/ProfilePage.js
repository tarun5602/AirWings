import React, { useEffect, useState } from "react";
import "./styles.css";
import CustomNavBar from "../../components/CustomNavBar/CustomNavBar";
import CustomFooter from "../../components/CustomFooter/CustomFooter";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  });

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}profile/`,
          {
            username: username,
            email: email,
          }
        );
        if (response.data.data) {
          setProfile((prevProfile) => ({
            ...prevProfile,
            ...response.data.data,
          }));
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [username, email]);

  const handleChange = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault?.(); // check if e.preventDefault exists (if triggered from button click)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}profile/`,
        {
          ...profile,
          username: username,
          email: email,
        }
      );
      if (response.data.message) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile.");
    }
  };

  return (
    <div className="profilePageBaseContainer">
      <div className="profilePageCustomNavbarBaseContainer">
        <CustomNavBar />
      </div>
      <div className="profilePageContentContainer">
        <div className="profilePageContentProfileBaseContainer">
          <div className="profilePageContentIconContainer">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="profilePageContentNameContainer">
            {`${username.charAt(0).toUpperCase()}${username?.slice(1)}`}
          </div>
        </div>
        <div className="profilePageContentTableBaseContainer">
          <div className="profilePageContentTableContainer">
            <h2>Personal Information</h2>
            <form className="profilePageContentFormBaseContainer">
              <div className="profilePageContentFormContainer">
                <label>First Name</label>
                <CustomInput
                  value={profile.first_name}
                  onChange={(e) => handleChange("first_name", e.target.value)}
                  placeholder="First Name"
                />
              </div>
              <div className="profilePageContentFormContainer">
                <label>Last Name</label>
                <CustomInput
                  value={profile.last_name}
                  onChange={(e) => handleChange("last_name", e.target.value)}
                  placeholder="Last Name"
                />
              </div>
              <div className="profilePageContentFormContainer">
                <label>Email Address</label>
                <CustomInput value={email} disabled placeholder="Email" />
              </div>
              <div className="profilePageContentFormContainer">
                <label>Phone Number</label>
                <CustomInput
                  value={profile.phone_number}
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                  placeholder="+91 9876543210"
                />
              </div>
              <div className="profilePageContentFormContainer profilePageContentAddressContainer">
                <label>Address</label>
                <CustomInput
                  value={profile.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="123 Aviation Street"
                />
              </div>
              <div className="profilePageContentFormContainer">
                <label>Date of Birth</label>
                <CustomInput
                  type="date"
                  value={profile.date_of_birth}
                  onChange={(e) =>
                    handleChange("date_of_birth", e.target.value)
                  }
                />
              </div>
              <div className="profilePageContentFormContainer">
                <label>Country</label>
                <CustomInput
                  value={profile.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  placeholder="India"
                />
              </div>
              <div className="profilePageContentFormContainer">
                <label>Postal Code</label>
                <CustomInput
                  value={profile.postal_code}
                  onChange={(e) => handleChange("postal_code", e.target.value)}
                  placeholder="143001"
                />
              </div>
              <div className="profilePageContentFormContainer">
                <label>State</label>
                <CustomInput
                  value={profile.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  placeholder="Punjab"
                />
              </div>
              <div className="profilePageContentFormContainer">
                <label>City</label>
                <CustomInput
                  value={profile.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="Amritsar"
                />
              </div>

              <div className="profilePageButtonContainer">
                <CustomButton title="Submit" onClick={handleSubmit} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="profilePageCustomFooterBaseContainer">
        <CustomFooter />
      </div>
      <ToastContainer draggable autoClose={5000} transition={Bounce} />
    </div>
  );
}

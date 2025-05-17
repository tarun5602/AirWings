import React, { useEffect, useState, useMemo } from "react";
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
    gender: "",
  });

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const getRandomColor = () => {
    const colors = [
      "#3D3D3D", // Charcoal
      "#1C1C1C", // Almost Black
      "#4B4453", // Deep Eggplant
      "#2E3440", // Arctic Night
      "#2F4858", // Dark Slate
      "#3A0CA3", // Deep Indigo
      "#432818", // Rich Brown
      "#2D3142", // Charcoal Blue
      "#36454F", // Charcoal Gray
      "#002B5B", // Navy Ink
      "#001524", // Midnight
      "#1E1E1E", // Dark Gray
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const avatarColor = useMemo(() => getRandomColor(), []);

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
        toast.error("Error fetching profile");
        console.error("Fetch profile error:", error);
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
    e.preventDefault?.();

    const {
      first_name,
      last_name,
      phone_number,
      address,
      date_of_birth,
      gender,
      country,
      postal_code,
      state,
      city,
    } = profile;

    let isValid = true;

    if (!first_name.trim()) {
      toast.error("First name is required.");
      isValid = false;
    }

    if (!last_name.trim()) {
      toast.error("Last name is required.");
      isValid = false;
    }

    if (!phone_number.trim()) {
      toast.error("Phone number is required.");
      isValid = false;
    } else if (!/^\d{10}$/.test(phone_number.trim())) {
      toast.error("Phone number must be exactly 10 digits.");
      isValid = false;
    }

    if (!address.trim()) {
      toast.error("Address is required.");
      isValid = false;
    }

    if (!date_of_birth) {
      toast.error("Date of birth is required.");
      isValid = false;
    }

    if (!gender) {
      toast.error("Gender is required.");
      isValid = false;
    }

    if (!country.trim()) {
      toast.error("Country is required.");
      isValid = false;
    }

    if (!postal_code.trim()) {
      toast.error("Postal code is required.");
      isValid = false;
    }

    if (!state.trim()) {
      toast.error("State is required.");
      isValid = false;
    }

    if (!city.trim()) {
      toast.error("City is required.");
      isValid = false;
    }

    if (!isValid) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}profile/`,
        {
          ...profile,
          username,
          email,
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
          <div
            style={{
              backgroundColor: avatarColor,
            }}
            className="profilePageContentIconContainer"
          >
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
                  required
                  value={profile.first_name}
                  onChange={(e) => handleChange("first_name", e.target.value)}
                  placeholder="First Name"
                />
              </div>
              <div className="profilePageContentFormContainer">
                <label>Last Name</label>
                <CustomInput
                  required
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
                  required
                  value={profile.phone_number}
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                  placeholder="+91 9876543210"
                />
              </div>
              <div className="profilePageContentFormContainer profilePageContentAddressContainer">
                <label>Address</label>
                <CustomInput
                  required
                  value={profile.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="123 Aviation Street"
                />
              </div>
              <div className="profilePageContentFormContainer">
                <label>Date of Birth</label>
                <CustomInput
                  required
                  type="date"
                  value={profile.date_of_birth}
                  onChange={(e) =>
                    handleChange("date_of_birth", e.target.value)
                  }
                />
              </div>

              <div className="profilePageContentFormContainer">
                <label>Gender</label>
                <div className="profilePageGenderOptions">
                  <label>
                    <input
                      type="radio"
                      value="M"
                      checked={profile.gender === "M"}
                      onChange={(e) => handleChange("gender", e.target.value)}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="F"
                      checked={profile.gender === "F"}
                      onChange={(e) => handleChange("gender", e.target.value)}
                    />
                    Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="O"
                      checked={profile.gender === "O"}
                      onChange={(e) => handleChange("gender", e.target.value)}
                    />
                    Other
                  </label>
                </div>
              </div>

              <div className="profilePageContentFormContainer">
                <label>Country</label>
                <CustomInput
                  required
                  value={profile.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  placeholder="India"
                />
              </div>
              <div className="profilePageContentFormContainer">
                <label>Postal Code</label>
                <CustomInput
                  required
                  value={profile.postal_code}
                  onChange={(e) => handleChange("postal_code", e.target.value)}
                  placeholder="143001"
                />
              </div>
              <div className="profilePageContentFormContainer">
                <label>State</label>
                <CustomInput
                  required
                  value={profile.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  placeholder="Punjab"
                />
              </div>
              <div className="profilePageContentFormContainer">
                <label>City</label>
                <CustomInput
                  required
                  value={profile.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="Amritsar"
                />
              </div>
            </form>
            <div className="profilePageButtonContainer">
              <CustomButton title="Submit" onClick={handleSubmit} />
            </div>
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

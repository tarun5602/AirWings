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
    gender_other: "",
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
    const alphaOnlyFields = [
      "first_name",
      "last_name",
      "city",
      "state",
      "country",
    ];
    const numericOnlyFields = ["phone_number", "postal_code"];

    let newValue = value;
    if (alphaOnlyFields.includes(key)) {
      newValue = newValue.replace(/[^a-zA-Z]/g, "");
      newValue =
        newValue.charAt(0).toUpperCase() + newValue.slice(1).toLowerCase();
    }

    if (numericOnlyFields.includes(key)) {
      newValue = newValue.replace(/[^0-9]/g, "");
      if (key === "phone_number") {
        newValue = newValue.slice(0, 10);
      } else if (key === "postal_code") {
        newValue = newValue.slice(0, 6);
      }
    }
    setProfile((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const handleBlur = (key) => {
    const value = profile[key]?.trim();

    const requiredFields = {
      first_name: "First name is required.",
      last_name: "Last name is required.",
      address: "Address is required.",
      date_of_birth: "Date of birth is required.",
      country: "Country is required.",
      state: "State is required.",
      city: "City is required.",
    };

    if (requiredFields[key] && !value) {
      toast.error(requiredFields[key]);
      return;
    }

    if (key === "phone_number") {
      if (!value) {
        toast.error("Phone number is required.");
      } else if (value.length !== 10) {
        toast.error("Phone number must be exactly 10 digits.");
      }
    }

    if (key === "postal_code") {
      if (!value) {
        toast.error("Postal code is required.");
      } else if (value.length !== 6) {
        toast.error("Postal code must be exactly 6 digits.");
      }
    }

    if (key === "gender_other" && profile.gender === "O") {
      if (!value) {
        toast.error("Please specify your gender.");
      }
    }
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
      gender_other,
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
    } else if (phone_number.length !== 10) {
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
    } else if (gender === "O" && !gender_other.trim()) {
      toast.error("Please specify your gender.");
      isValid = false;
    }

    if (!country.trim()) {
      toast.error("Country is required.");
      isValid = false;
    }

    if (!postal_code.trim()) {
      toast.error("Postal code is required.");
      isValid = false;
    } else if (postal_code.length !== 6) {
      toast.error("Postal code must be exactly 6 digits.");
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
                  onBlur={() => handleBlur("first_name")}
                  placeholder="First Name"
                />
              </div>
              <div className="profilePageContentFormContainer">
                <label>Last Name</label>
                <CustomInput
                  required
                  value={profile.last_name}
                  onChange={(e) => handleChange("last_name", e.target.value)}
                  onBlur={() => handleBlur("last_name")}
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
                  placeholder="9876543210"
                  onBlur={() => handleBlur("phone_number")}
                  type={"tel"}
                />
              </div>
              <div className="profilePageContentFormContainer profilePageContentAddressContainer">
                <label>Address</label>
                <CustomInput
                  required
                  value={profile.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  onBlur={() => handleBlur("address")}
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
                  onBlur={() => handleBlur("date_of_birth")}
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
                  {profile.gender === "O" && (
                    <CustomInput
                      required
                      value={profile.gender_other || ""}
                      onChange={(e) =>
                        handleChange("gender_other", e.target.value)
                      }
                      onBlur={() => handleBlur("gender_other")}
                      placeholder="Please specify"
                    />
                  )}
                </div>
              </div>

              <div className="profilePageContentFormContainer">
                <label>Country</label>
                <CustomInput
                  required
                  value={profile.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  onBlur={() => handleBlur("country")}
                  placeholder="India"
                />
              </div>
              <div className="profilePageContentFormContainer">
                <label>Postal Code</label>
                <CustomInput
                  required
                  value={profile.postal_code}
                  onChange={(e) => handleChange("postal_code", e.target.value)}
                  onBlur={() => handleBlur("postal_code")}
                  placeholder="143001"
                />
              </div>
              <div className="profilePageContentFormContainer">
                <label>State</label>
                <CustomInput
                  required
                  value={profile.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  onBlur={() => handleBlur("state")}
                  placeholder="Punjab"
                />
              </div>
              <div className="profilePageContentFormContainer">
                <label>City</label>
                <CustomInput
                  required
                  value={profile.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  onBlur={() => handleBlur("city")}
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

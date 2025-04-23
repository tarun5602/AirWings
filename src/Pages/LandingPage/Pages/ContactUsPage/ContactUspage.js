import React, { useState } from "react";
import "./styles.css";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { SlSocialLinkedin } from "react-icons/sl";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { PiBuildingOfficeFill } from "react-icons/pi";
import { ImClock } from "react-icons/im";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import ASSETS from "../../../../assets";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [color] = useState("var(--baseColor)");

  const handleChange = (key,value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      toast.warning("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}contact-us/`,
        formData
      );
      if (response.data.status) {
        toast.success(response.data.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      toast.error("Server not responding or request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="contactUsBaseContainer"
      style={{ backgroundImage: `url(${ASSETS.contactUsImage})` }}
    >
      <div className="contactUsContainer">
        <div className="contactUsFormContainer">
          <h1>Contact Us</h1>

          <CustomInput
            placeholder="Name"
            width="400px"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <CustomInput
            placeholder="Email"
            width="400px"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <CustomInput
            placeholder="Message"
            width="400px"
            name="message"
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
          />

          {loading ? (
            <div style={{ padding: "10px" }}>
              <ClipLoader color={color} size={30} />
            </div>
          ) : (
            <CustomButton
              title="Submit"
              width="400px"
              height="30px"
              onClick={handleSubmit}
            />
          )}
        </div>

        <div className="contactUsInfoContainer">
          <div className="contactUsInfoDesignContainer"></div>
          <div className="contactUsInfoDesignContainer infoSecondDesign">
            <FaFacebookF />
            <FaInstagram />
            <RiTwitterXFill />
            <SlSocialLinkedin />
          </div>
          <div className="contactUsInfoCredentialsContainer">
            <h1>Info</h1>
            <div className="contactUsInfoCredentialsInfoContainer">
              <MdOutlineMailOutline />
              <p>airwings@gmail.com</p>
            </div>
            <div className="contactUsInfoCredentialsInfoContainer">
              <LuPhone />
              <p>926-486-2249</p>
            </div>
            <div className="contactUsInfoCredentialsInfoContainer">
              <PiBuildingOfficeFill />
              <p>23, Main Street, AnyTown, USA</p>
            </div>
            <div className="contactUsInfoCredentialsInfoContainer">
              <ImClock />
              <p>8:00AM - 5:00PM</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer draggable autoClose={5000} transition={Bounce} />
    </div>
  );
}

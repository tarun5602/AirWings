import React, { useState } from "react";
import "./styles.css";
import { Rating } from "react-simple-star-rating";
import CustomInput from "../../../../../../components/CustomInput/CustomInput";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function Support() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
    rating: 0,
  });

  const categories = [
    { value: "service", label: "Service" },
    { value: "flight_experience", label: "Flight Experience" },
    { value: "booking", label: "Booking" },
    { value: "staff", label: "Staff" },
    { value: "other", label: "Other" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.category || !formData.message) {
      toast.error("Please fill all fields before submitting.");
      return;
    }
  
    if (formData.rating < 1) {
      toast.error("Please provide a rating.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}feedback/`,
        formData
      );
      if (response.data.status) {
        toast.success("Feedback submitted successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
          category: "",
          rating: 0,
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="feedbackBaseContainer">
      <div className="feedbackHeadingBaseContainer">
        <h2>Your Feedback Matters</h2>
        <p>
          Help us improve your travel experience by sharing your thoughts and
          suggestions
        </p>
      </div>

      <div className="feedbackFormBaseContainer">
        <div className="feedbackFormNameEmailBaseContainer">
          <div className="feedbackFormNameBaseContainer">
            <h5>Name</h5>
            <CustomInput
              placeholder={"Enter Name"}
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div className="FeedbackFormEmailBaseContainer">
            <h5>Email</h5>
            <CustomInput
              placeholder={"Enter Email"}
              type={"email"}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
        </div>

        <div className="feedbackFormCategoryBaseContainer">
          <h5>What would you like to give feedback about?</h5>
          <select
            className="customSelectInput"
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="feedbackFormFeedbackBaseContainer">
          <h5>Message</h5>
          <CustomInput
            placeholder={"Enter your message"}
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
          />
        </div>

        <div className="feedbackFormOverallExperienceBaseContainer">
          <h5>How would you rate your overall experience?</h5>
          <Rating
            onClick={(rate) => handleInputChange("rating", rate)}
            ratingValue={formData.rating}
            size={25}
            label
            transition
            fillColor="orange"
            emptyColor="gray"
          />
        </div>

        <div className="feedbackFormSubmitButtonContainer">
          {loading ? (
            <ClipLoader color="var(--baseColor)" size={30} />
          ) : (
            <CustomButton title={"Submit"} onClick={handleSubmit} />
          )}
        </div>
      </div>
      <ToastContainer draggable autoClose={5000} transition={Bounce}/>
    </div>
  );
}
import React, { useRef, useState } from "react";
import "./styles.css";
import { Rating } from "react-simple-star-rating";
import CustomInput from "../../../../../../components/CustomInput/CustomInput";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
import { toast } from "react-toastify";
import axios from "axios";

export default function Support() {
  const nameRef = useRef();
  const emailRef = useRef();
  const categoryRef = useRef();
  const messageRef = useRef();
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate / 20); // Convert from 0–100 to 1–5
  };

  const handleSubmit = async () => {
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      category: categoryRef.current.value,
      message: messageRef.current.value,
      rating: rating,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}api/feedback/`, payload);
      toast.success("Feedback submitted!");
      
      // Optional: Clear inputs
      nameRef.current.value = "";
      emailRef.current.value = "";
      categoryRef.current.value = "";
      messageRef.current.value = "";
      setRating(0);
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to submit feedback.");
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
            <CustomInput placeholder="Enter Name" inputRef={nameRef} />
          </div>
          <div className="FeedbackFormEmailBaseContainer">
            <h5>Email</h5>
            <CustomInput placeholder="Enter Email" type="email" inputRef={emailRef} />
          </div>
        </div>

        <div className="feedbackFormCategoryBaseContainer">
          <h5>What would you like to give feedback about?</h5>
          <CustomInput placeholder="Select Category" inputRef={categoryRef} />
        </div>

        <div className="feedbackFormFeedbackBaseContainer">
          <h5>Feedback</h5>
          <CustomInput placeholder="Enter Feedback" inputRef={messageRef} />
        </div>

        <div className="feedbackFormOverallExperienceBaseContainer">
          <h5>How would you rate your overall experience?</h5>
          <Rating onClick={handleRating} initialValue={rating * 20} />
        </div>

        <div className="feedbackFormSubmitButtonContainer">
          <CustomButton title="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

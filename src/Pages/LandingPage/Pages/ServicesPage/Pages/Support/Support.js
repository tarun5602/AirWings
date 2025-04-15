import React from "react";
import "./styles.css";
import CustomInput from "../../../../../../components/CustomInput/CustomInput";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Support() {
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
            <CustomInput placeholder={"Enter Name"} />
          </div>
          <div className="FeedbackFormEmailBaseContainer">
            <h5>Email</h5>
            <CustomInput placeholder={"Enter Email"} type={"email"} />
          </div>
        </div>
        <div className="feedbackFormCategoryBaseContainer">
          <h5>What would you like to give feedback about?</h5>
          <CustomInput placeholder={"Select Category"} />
        </div>
        <div className="feedbackFormFeedbackBaseContainer">
          <h5>Feedback</h5>
          <CustomInput placeholder={"Enter Feedback"} />
        </div>
        <div className="feedbackFormOverallExperienceBaseContainer">
          <h5>How would you rate your overall experience?</h5>
          <p>Stars</p>
        </div>
        <div className="feedbackFormSubmitButtonContainer">
          <CustomButton title={"Submit"} />
        </div>
      </div>
    </div>
  );
}

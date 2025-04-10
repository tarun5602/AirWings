import React from "react";
import "./styles.css";
import CustomInput from "../../../../../../components/CustomInput/CustomInput";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
export default function BaggageTracking() {
  return (
    <div className="baggageTrackingBaseContainer">
      <h2>Tracking You're Baggage</h2>
      <p>Follow your baggage in real-time with our advanced tracking system</p>
      <div className="baggageTrackingInputBaseContainer">
        <div className="baggageTrackingInputContainer">
          <CustomInput />
          <CustomButton title={"Track"} />
        </div>
      </div>
    </div>
  );
}

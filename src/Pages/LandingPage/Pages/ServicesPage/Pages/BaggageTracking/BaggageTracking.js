import React from "react";
import "./styles.css";
import CustomInput from "../../../../../../components/CustomInput/CustomInput";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
export default function BaggageTracking() {
  const TrackingBaggage = [
    {
      id: 1,
      trackNumber: "AB1234567890",
      owner: "John Doe",
      status: "Delivered",
      lastUpdated: "12 December 2022",
      estimatedTime: "2 hours",
    },
    {
      id: 1,
      trackNumber: "AB1234567890",
      owner: "John Doe",
      status: "Delivered",
      lastUpdated: "12 December 2022",
      estimatedTime: "2 hours",
    },
  ];

  return (
    <div className="baggageTrackingBaseContainer">
      <h2>Tracking You're Baggage</h2>
      <p>Follow your baggage in real-time with our advanced tracking system</p>
      <div className="baggageTrackingInputBaseContainer">
        <div className="baggageTrackingInputContainer">
          <CustomInput placeholder={"Enter Tracking Number"} />
          <CustomButton title={"Track"} />
        </div>
        <div className="baggageTrackingInformationBaseContainer">
          <h2>Baggage Location</h2>
          <div className="baggageTrackingInformationContainer">
            <h4>Tracking Baggage</h4>
            <h4>Owner</h4>
            <h4>Status</h4>
            <h4>Last Updated</h4>
            <h4>Estimated Time</h4>
          </div>
          {TrackingBaggage.map((baggage) => (
            <div
              key={baggage.id}
              className="baggageTrackingInformationItemContainer"
            >
              <p>{baggage.trackNumber}</p>
              <p>{baggage.owner}</p>
              <p>{baggage.status}</p>
              <p>{baggage.lastUpdated}</p>
              <p>{baggage.estimatedTime}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

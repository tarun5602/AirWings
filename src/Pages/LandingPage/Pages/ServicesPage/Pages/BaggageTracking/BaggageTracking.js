import React, { useEffect, useState } from "react";
import "./styles.css";
import CustomInput from "../../../../../../components/CustomInput/CustomInput";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function BaggageTracking() {
  const [baggages, setBaggages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [color] = useState("var(--baseColor)");

  const fetchBaggageData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}baggage/`
      );
      setBaggages(response.data);
    } catch (error) {
      toast.error("Error fetching baggage data");
      setBaggages([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBaggageData();
  }, []);

  return (
    <div className="baggageTrackingBaseContainer">
      <h2>Tracking Your Baggage</h2>
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
            <h4>Flight</h4>
          </div>

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <ClipLoader color={color} size={50} />
            </div>
          ) : baggages.length === 0 ? (
            <p style={{ padding: "10px" }}>No baggage found.</p>
          ) : (
            baggages.map((baggage) => (
              <div
                key={baggage.baggage_id}
                className="baggageTrackingInformationItemContainer"
              >
                <p>{baggage.baggage_id}</p>
                <p>{baggage.passenger_name}</p>
                <p>{baggage.status}</p>
                <p>{new Date(baggage.check_in_time).toLocaleString()}</p>
                <p>{baggage.flight}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

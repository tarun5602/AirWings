import React, { useEffect, useState } from "react";
import "./styles.css";
import CustomInput from "../../../../../../components/CustomInput/CustomInput";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function BaggageTracking() {
  const [baggages, setBaggages] = useState([]);
  const [filteredBaggages, setFilteredBaggages] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [color] = useState("var(--baseColor)");

  const fetchBaggageData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}baggage/`
      );
      setBaggages(response.data.data);
      setFilteredBaggages(response.data.data); 
    } catch (error) {
      toast.error("Error fetching baggage data");
      setBaggages([]);
      setFilteredBaggages([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBaggageData();
  }, []);

  const handleTrack = () => {
    if (!trackingNumber.trim()) {
      toast.warn("Please enter a tracking number.");
      return;
    }

    const filtered = baggages.filter(
      (b) =>
        b.baggage_id.toLowerCase() === trackingNumber.trim().toLowerCase()
    );

    if (filtered.length === 0) {
      toast.info("No baggage found with that tracking number.");
    }

    setFilteredBaggages(filtered);
  };

  return (
    <div className="baggageTrackingBaseContainer">
      <h2>Tracking Your Baggage</h2>
      <p>Follow your baggage in real-time with our advanced tracking system</p>

      <div className="baggageTrackingInputBaseContainer">
        <div className="baggageTrackingInputContainer">
          <CustomInput
            placeholder={"Enter Tracking Number"}
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <CustomButton title={"Track"} onClick={handleTrack} />
        </div>

        <div className="baggageTrackingInformationBaseContainer">
          <h2>Baggage Location</h2>
          <div className="baggageTrackingInformationContainer">
            <h4>Tracking Baggage</h4>
            <h4>Owner</h4>
            <h4>Flight</h4>
            <h4>Quantity</h4>
            <h4>Status</h4>
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
          ) : filteredBaggages.length === 0 ? (
            <p style={{ padding: "10px" }}>No baggage found.</p>
          ) : (
            filteredBaggages.map((baggage) => (
              <div
                key={baggage.baggage_id}
                className="baggageTrackingInformationItemContainer"
              >
                <p>{baggage.baggage_id}</p>
                <p>{baggage.user}</p>
                <p>{baggage.Flight}</p>
                <p>{baggage.quantity}</p>
                <p>{baggage.status}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

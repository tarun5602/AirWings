import React, { useEffect, useState } from "react";
import "./styles.css";
import CustomInput from "../../../../../../components/CustomInput/CustomInput";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
import axios from "axios";
import { ClipLoader } from "react-spinners";

export default function FlightBooking() {
  const [loading, setLoading] = useState(true);
  const [flightInfo, setFlightInfo] = useState([]);
  const [color] = useState("var(--baseColor)");

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}flights/create/`,
      );
      setFlightInfo(response.data || []);
    } catch (error) {
      console.error("Error fetching flights:", error);
      setFlightInfo([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="flightBookingBaseContainer">
      <div className="flightBookingSetRouteBaseContainer">
        <div className="flightBookingSetRouteDetailsBaseContianer">
          <p>Round Trip</p>
          <p>1 Passenger</p>
          <p>Economy</p>
        </div>

        <div className="flightBookingSetRouteInputBaseContainer">
          <div className="flightBookingSetRouteInputOne">
            <CustomInput width={"50%"} placeholder={"From"} />
            <MdOutlineSwapHorizontalCircle size={25} />
            <CustomInput width={"50%"} placeholder={"To"} />
          </div>
          <div className="flightBookingSetRouteInputTwo">
            <CustomInput type={"date"} width={"50%"} />
            <CustomInput type={"date"} width={"50%"} />
          </div>
        </div>

        <div className="flightBookingSetRouteSubmitButtonContainer">
          <CustomButton title={"Submit"} />
        </div>
      </div>

      <div className="flightBookingInformationBaseContainer">
        <h3 style={{ padding: "10px 0px" }}>Available Flights</h3>

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
        ) : flightInfo.length === 0 ? (
          <p>No flights found.</p>
        ) : (
          flightInfo.map((info) => (
            <div
              key={info.id}
              className="flightBookingInformationDetailsBaseContainer"
            >
              <p>
                {info.departure} → {info.arrival}
              </p>
              <p>
                {new Date(info.departure_time).toLocaleTimeString()} -{" "}
                {new Date(info.arrival_time).toLocaleTimeString()}
              </p>
              <p>{info.flights_class} Class</p>
              <p>Rs. {info.price}</p>
              <CustomButton title={"Book Now"} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

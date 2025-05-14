import React, { useEffect, useState } from "react";
import "./styles.css";
import CustomInput from "../../../../../../components/CustomInput/CustomInput";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
import CustomLoader from "../../../../../../components/CustomLoader/CustomLoader";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../../../../Config/routes";

export default function FlightBooking() {
  const [loading, setLoading] = useState(true);
  const [flightInfo, setFlightInfo] = useState([]);

  const navigate = useNavigate();

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}flights/`
      );
      setFlightInfo(response.data.data || []);
    } catch (error) {
      toast.error("Error fetching flights:", error);
      setFlightInfo([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleBookNow = async (data) => {
    try {
      const flightDetail = data ?? {};
      const username = localStorage.getItem("username");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}profile?username=${username}`
      );
      const response2 = await axios.get(
        `${process.env.REACT_APP_API_URL}baggage/`
      );
      if (response.data.status) {
        navigate(ROUTES.servicesPageFlightBookingFormPage, {
          state: {
            flightDetail: flightDetail,
            profileDetail: response.data.data,
            baggageDetail: response2.data.data,
          },
        });
      }
    } catch (error) {
      toast.error("Complete your Profile First");
    }
  };

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
          <div>
            <CustomLoader />
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
              <CustomButton
                title={"Book Now"}
                onClick={() => handleBookNow(info)}
              />
            </div>
          ))
        )}
      </div>
      <ToastContainer draggable autoClose={5000} transition={Bounce} />
    </div>
  );
}

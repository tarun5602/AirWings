import React from "react";
import "./styles.css";
import CustomInput from "../../../../../../components/CustomInput/CustomInput";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";

export default function FlightBooking() {
  const flighInfo = [
    {
      id: 1,
      location: "Punjab to Delhi",
      time: "3hrs",
      stops: "0",
      price: "1500",
    },
    {
      id: 2,
      location: "Punjab to Delhi",
      time: "3hrs",
      stops: "0",
      price: "1500",
    },
  ];
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
            <CustomInput width={"50%"} placeholder={"Too"} />
          </div>
          <div className="flightBookingSetRouteInputTwo">
            <CustomInput type={"date"} width={"50%"} />
            <CustomInput type={"date"} width={"50%"} />
          </div>
        </div>
      </div>
      <div className="flightBookingInformationBaseContainer">
        <h3
          style={{
            padding: "10px 0px",
          }}
        >
          Available Flights
        </h3>
        {flighInfo.map((info, index) => (
          <div
            key={info.id}
            className="flightBookingInformationDetailsBaseContainer"
          >
            <p>{info.location}</p>
            <p>{info.time}</p>
            <p>{info.stops} Stops</p>
            <p>Rs. {info.price}</p>
            <CustomButton title={"Book Now"} />
          </div>
        ))}
      </div>
    </div>
  );
}

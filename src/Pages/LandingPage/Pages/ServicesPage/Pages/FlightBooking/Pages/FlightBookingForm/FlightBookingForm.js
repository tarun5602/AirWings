import React from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import CustomInput from "../../../../../../../../components/CustomInput/CustomInput";

export default function FlightBookingForm() {
  const location = useLocation();
  const data = location.state;

  function calculateAge() {
    const dob = data.profileDetail.date_of_birth;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const mon = today.getMonth() - birthDate.getMonth();

    if (mon < 0 || (mon === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const age = calculateAge();

  return (
    <div className="flightBookingFormBaseContainer">
      <h2 style={{ textAlign: "center" }}>Booking Form</h2>

      <div className="flightBookingFormsContainer">
        <h3>Personal Details</h3>
        <div className="flightBookingFormGridBaseContainer">
          <div className="flighBookingFormGrid">
            <label>First Name</label>
            <CustomInput value={data.profileDetail.first_name} />
          </div>
          <div className="flighBookingFormGrid">
            <label>Last Name</label>
            <CustomInput value={data.profileDetail.last_name} />
          </div>
          <div className="flighBookingFormGrid">
            <label>Email</label>
            <CustomInput value={data.profileDetail.email} />
          </div>
          <div className="flighBookingFormGrid">
            <label>Number</label>
            <CustomInput value={data.profileDetail.phone_number} />
          </div>
          <div className="flighBookingFormGrid">
            <label>DOB</label>
            <CustomInput value={data.profileDetail.date_of_birth} />
          </div>
          <div className="flighBookingFormGrid">
            <label>Age</label>
            <CustomInput value={age} />
          </div>
        </div>
      </div>

      <div className="flightBookingFormsContainer">
        <h3>Flight Details</h3>
        <div className="flightBookingFormGridBaseContainer">
          <div className="flighBookingFormGrid">
            <label>Flight Number</label>
            <CustomInput value={data.flightDetail.flight_number} />
          </div>
          <div className="flighBookingFormGrid">
            <label>From</label>
            <CustomInput value={data.flightDetail.departure} />
          </div>
          <div className="flighBookingFormGrid">
            <label>To</label>
            <CustomInput value={data.flightDetail.arrival} />
          </div>
          <div className="flighBookingFormGrid">
            <label>Form Date</label>
            <CustomInput value={data.flightDetail.departure_time} />
          </div>
          <div className="flighBookingFormGrid">
            <label>To Date</label>
            <CustomInput value={data.flightDetail.arrival_time} />
          </div>
          <div className="flighBookingFormGrid">
            <label>Airline</label>
            <CustomInput value={data.flightDetail.airline} />
          </div>
          <div className="flighBookingFormGrid">
            <label>Available Seats</label>
            <CustomInput value={data.flightDetail.seats_available} />
          </div>
          <div className="flighBookingFormGrid">
            <label>Class</label>
            <CustomInput value={data.flightDetail.flights_class} />
          </div>
        </div>
      </div>

      <div className="flightBookingFormsContainer">
        <h3>Baggage Details</h3>
        <div className="flightBookingFormGridBaseContainer">
          <div className="flighBookingFormGrid">
            <label>{JSON.stringify(data)}</label>
          </div>
        </div>
      </div>

      <div className="flightBookingFormsContainer">
        <h3>Passport Details</h3>
        <div className="flightBookingFormGridBaseContainer">
          <div className="flighBookingFormGrid">
            <label>Flight Number</label>
            <CustomInput />
          </div>
          <div className="flighBookingFormGrid">
            <label>Passport Country</label>
            <CustomInput />
          </div>
          <div className="flighBookingFormGrid">
            <label>Passport Expiry Date</label>
            <CustomInput />
          </div>
          <div className="flighBookingFormGrid">
            <label>Nationality</label>
            <CustomInput />
          </div>
        </div>
      </div>

      <div className="flightBookingFormsContainer">
        <h3>Add Members</h3>
        <div className="flightBookingFormGridBaseContainer">
          <div className="flighBookingFormGrid">
            <label></label>
          </div>
        </div>
      </div>
    </div>
  );
}

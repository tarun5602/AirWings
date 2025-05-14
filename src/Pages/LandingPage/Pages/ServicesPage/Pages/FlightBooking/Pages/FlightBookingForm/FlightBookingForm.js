import React, { useState } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../../../../../components/CustomInput/CustomInput";
import CustomButton from "../../../../../../../../components/CustomButton/CustomButton";
import ROUTES from "../../../../../../../../Config/routes";

export default function FlightBookingForm() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const data = location.state;
  const [passportNumber, setPassportNumber] = React.useState("");
  const navigate = useNavigate();

  const validateBaggage = () => {
    for (const [i, baggage] of baggageList.entries()) {
      const weight = Number(baggage.weight);
      const quantity = Number(baggage.quantity);

      // Parse dimensions string "LxWxH" to numbers
      const dims = baggage.dimensions.split("x").map((d) => Number(d.trim()));
      const totalDimension = dims.reduce((a, b) => a + b, 0);

      if (!weight || isNaN(weight) || weight <= 0 || weight > 32) {
        toast.error(`Baggage: Weight must be between 1 and 32 kg.`);
        return false;
      }

      if (
        dims.length !== 3 ||
        dims.some((d) => isNaN(d) || d <= 0) ||
        totalDimension > 158
      ) {
        toast.error(
          `Baggage ${
            i + 1
          }: Dimensions must be in format LxWxH and total ≤ 158 cm.`
        );
        return false;
      }

      if (!quantity || isNaN(quantity) || quantity < 1 || quantity > 2) {
        toast.error(`Baggage: Quantity must be 1 or 2.`);
        return false;
      }

      if (!baggage.description.trim()) {
        toast.error(`Baggage: Description is required.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    const username = localStorage.getItem("username");
    const flightId = data.flightDetail.id;
    const profileId = data.profileDetail.id;

    const passportRegex = /^[A-Z][0-9]{7}$/;

    if (!passportNumber) {
      toast.error("Please enter your passport number.");
      return;
    }
    if (!passportRegex.test(passportNumber)) {
      toast.error(
        "Invalid passport number. It must be 1 capital letter followed by 7 digits (e.g. A1234567)."
      );
      return;
    }
    if (!validateBaggage()) {
      return;
    }

    try {
      const baggageIds = [];
      let user_id;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}profile?username=${username}`
        );
        if (response.data.id) {
          user_id = response.data.id;
        }
      } catch (error) {
        toast.error("Error fetching profile.");
        return;
      }

      for (const baggage of baggageList) {
        const baggageRes = await axios.post(
          `${process.env.REACT_APP_API_URL}baggage/`,
          {
            user: user_id,
            weight: baggage.weight,
            dimensions: baggage.dimensions,
            description: baggage.description,
            quantity: baggage.quantity,
          }
        );

        if (baggageRes.data.status) {
          baggageIds.push(baggageRes.data.data.id);
        } else {
          toast.error("Failed to add baggage.");
          return;
        }
      }

      for (const baggageId of baggageIds) {
        const bookingRes = await axios.post(
          `${process.env.REACT_APP_API_URL}booking/`,
          {
            user_id: user_id,
            profile_id: profileId,
            flight_id: flightId,
            baggage_id: baggageId,
            username: username,
            passport_number: passportNumber,
            num_passengers: 5,
          }
        );

        if (!bookingRes.data.status) {
          toast.error("Booking failed for baggage ID " + baggageId);
          return;
        }
      }

      toast.success("Booking Successful!");
      // navigate(ROUTES.homePage);
    } catch (error) {
      console.error(error);
      toast.error("Error during booking.");
    }
  };

  const [baggageList, setBaggageList] = useState([
    { weight: "", dimensions: "", quantity: "", description: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updatedList = [...baggageList];
    updatedList[index][field] = value;
    setBaggageList(updatedList);
  };

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
  data.profileDetail.age = age;

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
            <label>From Date</label>
            <CustomInput
              value={new Date(
                data.flightDetail.departure_time
              ).toLocaleString()}
            />
          </div>
          <div className="flighBookingFormGrid">
            <label>To Date</label>
            <CustomInput
              value={new Date(data.flightDetail.arrival_time).toLocaleString()}
            />
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
        <div className="flightBookingFormAddBaseContainer">
          <h3>Add Baggage</h3>
        </div>
        {baggageList.map((item, index) => (
          <div key={index} className="flightBookingFormGridBaseContainer">
            <div className="flighBookingFormGrid">
              <label>Weight (kg)</label>
              <CustomInput
                placeholder={"In Kg"}
                value={item.weight}
                onChange={(e) => handleChange(index, "weight", e.target.value)}
              />
            </div>
            <div className="flighBookingFormGrid">
              <label>Dimensions</label>
              <CustomInput
                placeholder={"55x40x60"}
                value={item.dimensions}
                onChange={(e) =>
                  handleChange(index, "dimensions", e.target.value)
                }
              />
            </div>
            <div className="flighBookingFormGrid">
              <label>Quantity</label>
              <CustomInput
                value={item.quantity}
                type={"number"}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value <= 46) {
                    handleChange(index, "quantity", e.target.value);
                  }
                }}
              />
            </div>
            <div className="flighBookingFormGrid">
              <label>Description</label>
              <CustomInput
                value={item.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flightBookingFormsContainer">
        <h3>Passport Details</h3>
        <div className="flightBookingFormGridBaseContainer">
          <div className="flighBookingFormGrid">
            <label>Passport Number</label>
            <CustomInput
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              placeholder="A1234567"
            />
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
      <CustomButton title={"Submit"} onClick={handleSubmit} />
      <ToastContainer draggable autoClose={5000} transition={Bounce} />
    </div>
  );
}

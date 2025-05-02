import React, { useEffect, useState } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../../../../../components/CustomInput/CustomInput";
import CustomButton from "../../../../../../../../components/CustomButton/CustomButton";

export default function FlightBookingForm() {
  const location = useLocation();
  const data = location.state;
  const [passportNumber, setPassportNumber] = React.useState("");

  const handleSubmit = async () => {
    const username = localStorage.getItem("username");
    const flightId = data.flightDetail.id;
    const profileId = data.profileDetail.id;

    if (!passportNumber) {
      alert("Please enter your passport number");
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
        console.error("Profile fetch error:", error);
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
          toast.error("Failed to add baggage");
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
          }
        );

        if (!bookingRes.data.status) {
          toast.error("Booking failed for baggage ID " + baggageId);
          return;
        }
      }

      toast.success("Booking Successful!");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Error during booking. Check console.");
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

  const addBaggage = () => {
    setBaggageList([
      ...baggageList,
      { weight: "", dimensions: "", quantity: "", description: "" },
    ]);
  };

  const removeBaggage = (index) => {
    const updatedList = baggageList.filter((_, i) => i !== index);
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
        <div className="flightBookingFormAddBaseContainer">
          <h3>Add Baggage</h3>
          <CustomButton
            width={"18%"}
            title={"Add Bag"}
            onClick={addBaggage}
            className="addBtn"
          />
        </div>
        {baggageList.map((item, index) => (
          <div key={index} className="flightBookingFormGridBaseContainer">
            <div className="flighBookingFormGrid">
              <label>Weight (kg)</label>
              <CustomInput
                value={item.weight}
                onChange={(e) => handleChange(index, "weight", e.target.value)}
              />
            </div>
            <div className="flighBookingFormGrid">
              <label>Dimensions</label>
              <CustomInput
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
                onChange={(e) =>
                  handleChange(index, "quantity", e.target.value)
                }
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
            <div className="flighBookingFormGrid baggageActionButtons">
              <CustomButton
                title={"Remove"}
                onClick={() => removeBaggage(index)}
                className="removeBtn"
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
              placeholder="Enter Passport Number"
            />
          </div>
        </div>
      </div>

      <div className="flightBookingFormsContainer">
        <h3>Add Members</h3>
        <div className="flightBookingFormGridBaseContainer">
          <div className="flighBookingFormGrid">
            <label>{JSON.stringify(data.baggageDetail)}</label>
          </div>
        </div>
      </div>
      <CustomButton title={"Submit"} onClick={handleSubmit} />
      <ToastContainer draggable autoClose={5000} transition={Bounce} />
    </div>
  );
}

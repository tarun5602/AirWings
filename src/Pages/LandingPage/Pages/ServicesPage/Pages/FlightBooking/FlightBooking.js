import React, { useEffect, useState } from "react";
import "./styles.css";
import CustomInput from "../../../../../../components/CustomInput/CustomInput";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
import CustomLoader from "../../../../../../components/CustomLoader/CustomLoader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../../../../Config/routes";

export default function FlightBooking() {
  const [loading, setLoading] = useState(true);
  const [flightInfo, setFlightInfo] = useState([]);
  const [flightInfoFilter, setFlightInfoFilter] = useState([]);

  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [searchDepartureDate, setSearchDepartureDate] = useState("");
  const [searchArrivalDate, setSearchArrivalDate] = useState("");

  const navigate = useNavigate();

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}flights/`
      );
      setFlightInfo(response.data.data || []);
      setFlightInfoFilter(response.data.data || []);
    } catch (error) {
      toast.error("Error fetching flights:", error);
      setFlightInfo([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  useEffect(() => {
    const filtered = flightInfoFilter.filter((flight) => {
      const fromMatch = flight.departure
        .toLowerCase()
        .includes(searchFrom.trim().toLowerCase());

      const toMatch = flight.arrival
        .toLowerCase()
        .includes(searchTo.trim().toLowerCase());

      const depMatch = searchDepartureDate
        ? flight.departure_time.slice(0, 10) === searchDepartureDate
        : true;

      const arrMatch = searchArrivalDate
        ? flight.arrival_time.slice(0, 10) === searchArrivalDate
        : true;

      if (
        !searchFrom &&
        !searchTo &&
        !searchDepartureDate &&
        !searchArrivalDate
      )
        return true;

      return fromMatch && toMatch && depMatch && arrMatch;
    });

    setFlightInfo(filtered);
  }, [
    searchFrom,
    searchTo,
    searchDepartureDate,
    searchArrivalDate,
    flightInfoFilter,
  ]);

  const handleClearFilters = () => {
    setSearchFrom("");
    setSearchTo("");
    setSearchDepartureDate("");
    setSearchArrivalDate("");
  };

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
          <p>Search Trip</p>
        </div>

        <div className="flightBookingSetRouteInputBaseContainer">
          <div className="flightBookingSetRouteInputOne">
            <CustomInput
              width={"50%"}
              placeholder={"From"}
              value={searchFrom}
              onChange={(e) => setSearchFrom(e.target.value)}
            />
            <CustomInput
              width={"50%"}
              placeholder={"To"}
              value={searchTo}
              onChange={(e) => setSearchTo(e.target.value)}
            />
          </div>
          <div className="flightBookingSetRouteInputTwo">
            <CustomInput
              type={"date"}
              width={"50%"}
              placeholder={"Departure"}
              value={searchDepartureDate}
              onChange={(e) => setSearchDepartureDate(e.target.value)}
            />
            <CustomInput
              type={"date"}
              width={"50%"}
              placeholder={"Arrival"}
              value={searchArrivalDate}
              onChange={(e) => setSearchArrivalDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flightBookingSetRouteSubmitButtonContainer">
          <CustomButton title={"Clear"} onClick={handleClearFilters} />
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
              <p>
                {new Date(info.departure_time).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}{" "}
                -{" "}
                {new Date(info.arrival_time).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
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

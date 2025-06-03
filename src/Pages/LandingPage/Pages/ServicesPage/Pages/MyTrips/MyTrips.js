import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import CustomLoader from "../../../../../../components/CustomLoader/CustomLoader";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
import { FaArrowRight } from "react-icons/fa6";
import { IoAirplaneOutline } from "react-icons/io5";
import {
  MdDateRange,
  MdOutlineAccessTime,
  MdOutlinePeopleAlt,
} from "react-icons/md";
import { ImPriceTags } from "react-icons/im";
import { LuBaggageClaim } from "react-icons/lu";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../../../../Config/routes";

export default function MyTrips() {
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState([]);
  const [profileDetails, setProfileDetails] = useState(null);
  const navigate = useNavigate();

  const GST_PERCENT = 18;
  const PLATFORM_FEE_PERCENT = 2;

  const calculateFinalPrice = (basePrice) => {
    const gstAmount = (basePrice * GST_PERCENT) / 100;
    const platformFee = (basePrice * PLATFORM_FEE_PERCENT) / 100;
    return (basePrice + gstAmount + platformFee).toFixed(2);
  };

  const shortId = (id) => id?.slice(0, 6) + "...";

  useEffect(() => {
    setLoading(true);
    const fetchBookings = async () => {
      const username = localStorage.getItem("username");

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}profile?username=${username}`
        );
        if (response.data.data.id) {
          setProfileDetails(response.data.data);
          console.log("Profile Details:", response.data.data);

          try {
            const response1 = await axios.get(
              `${process.env.REACT_APP_API_URL}booking?username=${username}`
            );
            console.log("Flight Details", response1.data.data);
            if (response1.data.status) {
              const formattedBookings = response1.data.data.map((booking) => ({
                id: booking.id,
                flightId: booking.flight.id,
                flightNo: booking.flight.flight_number,
                airlineName: booking.flight.airline,
                fromLocation: booking.flight.departure,
                toLocation: booking.flight.arrival,
                fromDate: booking.flight.departure_time.split("T")[0],
                fromTime: new Date(
                  booking.flight.departure_time
                ).toLocaleTimeString(),
                toDate: booking.flight.arrival_time.split("T")[0],
                toTime: new Date(
                  booking.flight.arrival_time
                ).toLocaleTimeString(),
                terminal: booking.flight.terminal,
                gate: booking.flight.gate,
                seat:
                  booking.flight?.assigned_seats &&
                  Array.isArray(booking.flight.assigned_seats)
                    ? booking.flight.assigned_seats
                        .map((seat) => {
                          const rawSeat = String(
                            seat?.seat_number || ""
                          ).replace(/^[A-Z]?/, "");
                          const prefix =
                            booking.flight.flights_class === "BC"
                              ? "B"
                              : booking.flight.flights_class === "VC"
                              ? "V"
                              : booking.flight.flights_class === "EC"
                              ? "E"
                              : "";
                          return `${prefix}${rawSeat}`;
                        })
                        .join(", ")
                    : "Not Assigned",

                class: booking.flight.flights_class,
                passengers:
                  booking.members?.length > 0
                    ? `${booking.members.length + 1} Persons`
                    : "1 Person",
                totalPrice: booking.flight.price || "N/A",
                finalPrice: calculateFinalPrice(booking.flight.price || 0),
                baggage: booking.baggage,
                status: "On Time",
                members: booking.members || [],
              }));
              setFlights(formattedBookings);
            }
          } catch (error) {
            toast.error("Failed to fetch bookings:", error);
          }
        }
      } catch (error) {
        toast.error("Profile fetch error:", error);
      }
      setLoading(false);
    };
    fetchBookings();
  }, []);

  const handlePDF = (trip, baggage) => {
    console.log(trip);
    navigate(ROUTES.servicesPageMyTripsPageViewPDF, {
      state: {
        tripDetails: trip,
        profileDetails: profileDetails,
        baggageDetails: baggage,
        airlineName: trip.airlineName,
        members: trip.members,
      },
    });
  };

  const handleCancellation = (trip) => {
    navigate(ROUTES.servicesPageMyTripsPageCancelTicket, {
      state: {
        tripDetails: trip,
        airlineName: trip.airlineName,
        bookingId: trip.id,
        members: trip.members,
      },
    });
  };

  return (
    <div className="myTripsBaseContainer">
      <div className="myTripHeadingContainer">
        <h2>My Trips</h2>
        <p>Manage your upcoming flights and travel plans</p>
      </div>
      {loading ? (
        <div>
          <CustomLoader />
        </div>
      ) : flights.length === 0 ? (
        <p style={{ paddingTop: "20px" }}>No Trips found.</p>
      ) : (
        <div className="myTripInformationBaseContainer">
          {flights.map((item) => (
            <div key={item.id} className="myTripInformationItemBaseContainer">
              <div className="myTripInformationHeadingBaseContainer">
                <IoAirplaneOutline size={29} />
                <div className="myTripInformationHeadingContainer">
                  <div className="myTripInformationHeading">
                    <p>Flight Number</p>
                    <h4>{item.flightNo}</h4>
                  </div>
                  <div className="myTripInformationHeadingButton">
                    <CustomButton title={item.status} />
                  </div>
                </div>
              </div>

              <div className="myTripInfromationMainItemBaseContainer">
                <div className="myTripInformationMainItemLoctionBaseContainer">
                  <div className="myTripInformationMainItemFromLocationBaseContainer">
                    <p>From</p>
                    <h4>{item.fromLocation}</h4>
                    <div className="myTripInfromationMainItemFromLoactionDateTimeContainer">
                      <MdDateRange />
                      <p>{item.fromDate}</p>
                      <MdOutlineAccessTime />
                      <p>{item.fromTime}</p>
                    </div>
                  </div>

                  <div className="myTripInformationMainItemLocationArrowContainer">
                    <FaArrowRight size={30} />
                  </div>

                  <div className="mytripInformationMainItemToLocationBaseLoaction">
                    <p>To</p>
                    <h4>{item.toLocation}</h4>
                    <div className="myTripInfromationMainItemFromLoactionDateTimeContainer">
                      <MdDateRange />
                      <p>{item.toDate}</p>
                      <MdOutlineAccessTime />
                      <p>{item.toTime}</p>
                    </div>
                  </div>
                </div>

                <div className="myTripInformationMainItemTypeBaseContainer">
                  <div className="myTripInformationMainItemTypeTerminalContianer">
                    <p>Terminal</p>
                    <h4>{item.terminal}</h4>
                  </div>
                  <div className="myTripInformationMainItemTypeGateContianer">
                    <p>Gate</p>
                    <h4>{item.gate}</h4>
                  </div>
                  <div className="myTripInformationMainItemTypeSeatContianer">
                    <p>Seat</p>
                    <h4>{item.seat}</h4>
                  </div>
                  <div className="myTripInformationMainItemTypeClassContianer">
                    <p>Class</p>
                    <h4>{item.class}</h4>
                  </div>
                </div>

                <div className="mytripInformationMainItemPriceBaseContainer">
                  <div className="myTripInformationMainItemPricePassengersBaseContainer">
                    <MdOutlinePeopleAlt />
                    <div className="myTripInformationMainItemPricePassengerContainer">
                      <p>Passengers</p>
                      <h4>{item.passengers}</h4>
                    </div>
                  </div>
                  <div className="myTripInforamtionMainItemPricePriceBaseContainer">
                    <ImPriceTags />
                    <div className="myTripInformationMainItemPricePriceContainer">
                      <p>Total Price</p>
                      <h4>{item.finalPrice}</h4>
                    </div>
                  </div>
                  <div className="myTripInformationMainItemPriceBaggageBaseContainer">
                    <LuBaggageClaim />
                    <div className="myTripInformationMainItemPriceBaggageContainer">
                      <p>Baggage</p>
                      <h4 title={item.baggage.baggage_id}>
                        {shortId(item.baggage.baggage_id)}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="myTripsInformationMainItemModifactionButtonBaseContainer">
                  <CustomButton
                    title={"Download Ticket"}
                    onClick={() => handlePDF(item, item.baggage)}
                  />
                  <CustomButton
                    title={"Cancel Ticket"}
                    onClick={() => handleCancellation(item)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer draggable autoClose={5000} transition={Bounce} />
    </div>
  );
}
